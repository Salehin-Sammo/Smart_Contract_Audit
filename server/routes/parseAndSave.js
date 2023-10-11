require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { Report, Vulnerability, ReportVulnerability } = require('../models');

const parseSlitherOutput = (reportData) => {
    const vulnerabilities = [];
    const lines = reportData.split("\n");
    let currentVulnerability = null;
  
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
  
        // Parsing Summary Section
        if (line.startsWith("- [")) {
            const matches = line.match(/\- \[(.*?)\]\(.*?\) \((\d+) results\) \((.*?)\)/);
            if (matches) {
                currentVulnerability = {
                    name: matches[1],
                    count: parseInt(matches[2], 10),
                    severity: matches[3],
                    details: [],
                };
                vulnerabilities.push(currentVulnerability);
            }
        }
        // Parsing Vulnerability Detail Section
        else if (line.startsWith("##")) {
            const vulnerabilityName = line.replace("##", "").trim();
            currentVulnerability = vulnerabilities.find(v => v.name === vulnerabilityName);
        } else if (line.startsWith("Impact:") && currentVulnerability) {
            currentVulnerability.impact = line.split("Impact:")[1].trim();
        } else if (line.length > 0 && currentVulnerability) {
            currentVulnerability.details.push(line);
        }
    }
  
    // Assuming contract name is provided in a line like: "Contract: ContractName"
    const contractNameLine = lines.find(line => line.trim().startsWith("Contract:"));
    const contractName = contractNameLine ? contractNameLine.split(":")[1].trim() : "Unknown Contract";
  
    return {
        vulnerabilities: vulnerabilities,
        contractName: contractName,
        auditDate: new Date(),
    };
  };
  
  

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({message: 'Access denied. No token provided.'});

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (ex) {
      res.status(400).send({message: 'Invalid token.'});
  }
};

router.post('/save-report', async (req, res) => {
    const { mdFilePath, userID: userId, userName, link } = req.body;  // Extract the link from the request
  
    // Validate mdFilePath, userID, userName, and link
    if (!mdFilePath || !userId || !userName || !link) {
      return res.status(400).json({ error: 'Required data missing in the request' });
    }
  
    try {
      const reportData = fs.readFileSync(path.join(__dirname, '..', 'slither_output', mdFilePath), 'utf8');
      const parsedData = parseSlitherOutput(reportData);
  
      // Create a report
      const report = await Report.create({
        contractName: userName,  // Use userName as contractName
        auditDate: parsedData.auditDate,
        userId,
        link   // Save the link here
      });
  
      for (const vulnerabilityData of parsedData.vulnerabilities) {
        // Check if the vulnerability exists
        let vulnerability = await Vulnerability.findOne({ where: { vulnerabilityName: vulnerabilityData.name } });
        
        // If not, create it
        if (!vulnerability) {
          vulnerability = await Vulnerability.create({
            vulnerabilityName: vulnerabilityData.name,
            count: vulnerabilityData.count,
            impact: vulnerabilityData.impact,
            description: vulnerabilityData.details.join("\n")
          });
        }
  
        // Link the vulnerability with the report
        await ReportVulnerability.create({
          reportId: report.reportId,
          vulnerabilityId: vulnerability.vulnerabilityId
        });
      }
  
      res.json({ success: true, report: report });
  
    } catch (error) {
      console.error(`Error parsing and saving the report: ${error}`);
      return res.status(500).json({ error: `Error processing the report: ${error.message}` });
    }
});


router.get('/get-vulnerabilities', async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.findAll();
        res.json({ success: true, vulnerabilities });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch vulnerabilities' });
    }
});

module.exports = router;