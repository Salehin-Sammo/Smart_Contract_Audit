//Sariya Akhter Lura 103820052
import React from 'react';
import './Dashboard.css'; 
//define the Dashboard component
export function Dashboard() {
    return (
        <div div className="dashboard-container">
            <h1 className="dashboard-heading">Smart Contract Audits</h1>
            <p className="dashboard-paragraph">Navigating the world of smart contracts can be intricate and demanding. Here, we prioritize the security and efficiency of your decentralized applications. Our dedicated team of blockchain experts is committed to providing comprehensive smart contract audits, ensuring your codes are free from vulnerabilities and are optimized for peak performance.

Stay a step ahead in the decentralized future. Trust in our expertise to safeguard your investments and uphold the integrity of your projects. Dive in and discover how we can fortify your smart contract's defenses!</p>

            <h2 className="dashboard-heading2">Benefits of our smart contract audit service</h2>

            <p className="dashboard-paragraph4">
                <b>Security Enhancement:</b> Our smart contract audits identify vulnerabilities, weaknesses, and potential exploits within the code. Addressing these issues proactively helps prevent hacks & breaches.
            </p>
            <p className="dashboard-paragraph4">
                <b>Risk Mitigation:</b> By identifying and addressing vulnerabilities, audits reduce the risk of financial loss, reputation damage, and legal consequences due to security breaches or contract failures.
            </p>
            <p className="dashboard-paragraph4">
                <b>Code Quality Improvement:</b> Our audits can help improve code quality by identifying and rectifying coding errors, reducing the likelihood of unintended behaviors, and enhancing the overall robustness of the codebase.
            </p>
            <p className="dashboard-paragraph4">
                <b>Trust and Confidence:</b> Our smart contract audits provide users, investors, and stakeholders with confidence in the reliability of the contract. This fosters trust in the system and encourages wider adoption.
            </p>
            <p className="dashboard-paragraph4">
                <b>Regulatory Compliance:</b> Our audits can ensure that the smart contract complies with applicable legal and regulatory requirements, reducing potential legal risks associated with non-compliance.
            </p>
            <h2 className="dashboard-heading3">How a smart contract audit works</h2>

            <div class="auditing-section">
            <div class="auditing-step">
                <p class="auditing-title">Analysis</p>
                <p class="auditing-description">
                   We deeply analyze the project's purpose and vulnerabilities to ensure risk-free code.
                </p>
            </div>
            <div class="auditing-step">
                <p class="auditing-title">Evaluation</p>
                <p class="auditing-description">
                   We have implemented a series of automated scans to find issues in the code.
                </p>
            </div>
            <div class="auditing-step">
                <p class="auditing-title">Reporting</p>
                <p class="auditing-description">
                   After finding the issues, we deliver a comprehensive report with possible solutions.
                </p>
            </div>
        </div>
        
            <h1 className="service"> Our Services </h1>

        <div class="services-container">
    <div class="service-box">
        <p class="dashboard-paragraph5">Smart Contract Audits</p>
        <p class="dashboard-paragraph6">
            We provide comprehensive smart contract audits to identify vulnerabilities, weaknesses, and potential exploits within the code.
        </p>
        <button class="request-audit-btn">Request Audit Report</button> 
    </div>
    <div class="service-box">
        <p class="dashboard-paragraph5">Automated Security Analysis</p>
        <p class="dashboard-paragraph6">
            We provide automated security analysis of smart contracts to identify potential vulnerabilities and weaknesses within the code.
        </p>
        <button class="request-analysis-btn">Request Analysis</button> 
    </div>
</div>

            <div className="contact">
                <h1 className="contact-heading"> Request an Audit Today</h1>
                <p className="contact-paragraph">Get in touch with us</p>
                <button className="contact-btn">Contact us</button>
            </div>
            <div className="subscribe">
                <h1 className="subscribe-heading">Subscribe to our newsletter</h1>
                <p className="subscribe-paragraph">Get the latest updates and news about smart contract security</p>
                <p className="subscribe-email">Email:</p>
                <input type="text" className="subscribe-input" placeholder="Enter your email address" />
                <button className="subscribe-btn">Subscribe</button>
              
            </div>


        </div>
        

    );
}


export default Dashboard;