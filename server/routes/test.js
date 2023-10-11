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




  const sampleStdout = `
  **THIS CHECKLIST IS NOT COMPLETE**. Use --show-ignored-findings to show all the results.
  Summary
  
  - [unused-return](#unused-return) (6 results) (Medium)
  - [events-access](#events-access) (1 results) (Low)
  - [missing-zero-check](#missing-zero-check) (1 results) (Low)
  - [reentrancy-events](#reentrancy-events) (2 results) (Low)
  - [timestamp](#timestamp) (4 results) (Low)
  - [assembly](#assembly) (3 results) (Informational)
  - [dead-code](#dead-code) (35 results) (Informational)
  - [solc-version](#solc-version) (2 results) (Informational)
  - [low-level-calls](#low-level-calls) (4 results) (Informational)
  - [naming-convention](#naming-convention) (2 results) (Informational)
  - [reentrancy-unlimited-gas](#reentrancy-unlimited-gas) (1 results) (Informational)
  - [unused-state](#unused-state) (1 results) (Informational)
  
  ## unused-return
  
  Impact: Medium
  Confidence: Medium
  
  - [ ] ID-0
    [ActivityPool.bet(uint256,uint256,uint256)](uploads/1696571680645.sol#L1350-L1398) ignores return value by [userPid[msg.sender].add(pID)](uploads/1696571680645.sol#L1370)
  
  uploads/1696571680645.sol#L1350-L1398
  
  - [ ] ID-1
    [ActivityPool.addNewAct(string,string,string,address,uint256,uint256,uint256,uint256)](uploads/1696571680645.sol#L1311-L1337) ignores return value by [activePeriod.add(id)](uploads/1696571680645.sol#L1334)
  
  uploads/1696571680645.sol#L1311-L1337
  
  - [ ] ID-2
    [ActivityPool.bet(uint256,uint256,uint256)](uploads/1696571680645.sol#L1350-L1398) ignores return value by [aUsers[pID].add(msg.sender)](uploads/1696571680645.sol#L1375)
  
  uploads/1696571680645.sol#L1350-L1398
  
  - [ ] ID-3
    [ActivityPool.removePeriodAct(uint256)](uploads/1696571680645.sol#L1340-L1347) ignores return value by [activePeriod.remove(pID)](uploads/1696571680645.sol#L1343)
  
  uploads/1696571680645.sol#L1340-L1347
  
  - [ ] ID-4
    [ActivityPool.bet(uint256,uint256,uint256)](uploads/1696571680645.sol#L1350-L1398) ignores return value by [bUsers[pID].add(msg.sender)](uploads/1696571680645.sol#L1378)
  
  uploads/1696571680645.sol#L1350-L1398
  
  - [ ] ID-5
    [ActivityPool.removePeriodAct(uint256)](uploads/1696571680645.sol#L1340-L1347) ignores return value by [removePeriod.add(pID)](uploads/1696571680645.sol#L1344)
  
  uploads/1696571680645.sol#L1340-L1347
  
  ## events-access
  
  Impact: Low
  Confidence: Medium
  
  - [ ] ID-6
    [Operator.setOperator(address)](uploads/1696571680645.sol#L859-L861) should emit an event for:
    - [operator = operator_](uploads/1696571680645.sol#L860)
  
  uploads/1696571680645.sol#L859-L861
  
  ## missing-zero-check
  
  Impact: Low
  Confidence: Medium
  
  - [ ] ID-7
    [Operator.setOperator(address).operator_](uploads/1696571680645.sol#L859) lacks a zero-check on :
    - [operator = operator_](uploads/1696571680645.sol#L860)
  
  uploads/1696571680645.sol#L859
  
  ## reentrancy-events
  
  Impact: Low
  Confidence: Medium
  
  - [ ] ID-8
    Reentrancy in [ActivityPool.bet(uint256,uint256,uint256)](uploads/1696571680645.sol#L1350-L1398):
    External calls:
    - [IERC20(actInfo[pID].rewardToken).safeTransferFrom(msg.sender,address(this),amount)](uploads/1696571680645.sol#L1395)
      Event emitted after the call(s):
    - [Bet(msg.sender,pID,bType,amount,betInfo[id].betTime)](uploads/1696571680645.sol#L1397)
  
  uploads/1696571680645.sol#L1350-L1398
  
  - [ ] ID-9
    Reentrancy in [ActivityPool.claim(uint256)](uploads/1696571680645.sol#L1417-L1429):
    External calls:
    - [IERC20(actInfo[pID].rewardToken).safeTransfer(msg.sender,amount)](uploads/1696571680645.sol#L1423)
      External calls sending eth:
    - [address(msg.sender).transfer(amount)](uploads/1696571680645.sol#L1425)
      Event emitted after the call(s):
    - [Claim(msg.sender,pID,betInfo[id].bType,amount)](uploads/1696571680645.sol#L1428)
  
  uploads/1696571680645.sol#L1417-L1429
  
  ## timestamp
  
  Impact: Low
  Confidence: Medium
  
  - [ ] ID-10
    [ActivityPool.checkBet(address,uint256,uint256,uint256)](uploads/1696571680645.sol#L1544-L1564) uses timestamp for comparisons
    Dangerous comparisons:
    - [require(bool,string)(actInfo[pID].startTime &lt;= block.timestamp,not start)](uploads/1696571680645.sol#L1551)
    - [require(bool,string)(actInfo[pID].endTime &gt; block.timestamp,has end)](uploads/1696571680645.sol#L1552)
  
  uploads/1696571680645.sol#L1544-L1564
  
  - [ ] ID-11
    [ActivityPool.setPrize(uint256,uint256)](uploads/1696571680645.sol#L1400-L1413) uses timestamp for comparisons
    Dangerous comparisons:
    - [block.timestamp &lt;= actInfo[pID].startTime](uploads/1696571680645.sol#L1403)
  
  uploads/1696571680645.sol#L1400-L1413
  
  - [ ] ID-12
    [ActivityPool.getStatus(uint256)](uploads/1696571680645.sol#L1589-L1607) uses timestamp for comparisons
    Dangerous comparisons:
    - [block.timestamp &lt; actInfo[pID].startTime](uploads/1696571680645.sol#L1594)
    - [actInfo[pID].startTime &lt;= block.timestamp &amp;&amp; actInfo[pID].endTime &gt; block.timestamp](uploads/1696571680645.sol#L1597-L1598)
    - [actInfo[pID].endTime &lt;= block.timestamp &amp;&amp; actInfo[pID].winType == 0](uploads/1696571680645.sol#L1601)
  
  uploads/1696571680645.sol#L1589-L1607
  
  - [ ] ID-13
    [ActivityPool.checkAdd(address,uint256,uint256,uint256,uint256)](uploads/1696571680645.sol#L1574-L1587) uses timestamp for comparisons
    Dangerous comparisons:
    - [require(bool,string)(startTime &gt; block.timestamp,startTime err)](uploads/1696571680645.sol#L1582)
  
  uploads/1696571680645.sol#L1574-L1587
  
  ## assembly
  
  Impact: Informational
  Confidence: High
  
  - [ ] ID-14
    [EnumerableSet.values(EnumerableSet.AddressSet)](uploads/1696571680645.sol#L1155-L1165) uses assembly
    - [INLINE ASM](uploads/1696571680645.sol#L1160-L1162)
  
  uploads/1696571680645.sol#L1155-L1165
  
  - [ ] ID-15
    [Address._revert(bytes,string)](uploads/1696571680645.sol#L231-L243) uses assembly
    - [INLINE ASM](uploads/1696571680645.sol#L236-L239)
  
  uploads/1696571680645.sol#L231-L243
  
  - [ ] ID-16
    [EnumerableSet.values(EnumerableSet.UintSet)](uploads/1696571680645.sol#L1229-L1239) uses assembly
    - [INLINE ASM](uploads/1696571680645.sol#L1234-L1236)
  
  uploads/1696571680645.sol#L1229-L1239
  
  ## dead-code
  
  Impact: Informational
  Confidence: Medium
  
  - [ ] ID-17
    [EnumerableSet.values(EnumerableSet.Bytes32Set)](uploads/1696571680645.sol#L1089-L1091) is never used and should be removed
  
  uploads/1696571680645.sol#L1089-L1091
  
  - [ ] ID-18
    [Address.verifyCallResult(bool,bytes,string)](uploads/1696571680645.sol#L219-L229) is never used and should be removed
  
  uploads/1696571680645.sol#L219-L229
  
  - [ ] ID-19
    [SafeMath.sub(uint256,uint256)](uploads/1696571680645.sol#L385-L387) is never used and should be removed
  
  uploads/1696571680645.sol#L385-L387
  
  - [ ] ID-20
    [SafeMath.average(uint256,uint256)](uploads/1696571680645.sol#L548-L551) is never used and should be removed
  
  uploads/1696571680645.sol#L548-L551
  
  - [ ] ID-21
    [EnumerableSet.length(EnumerableSet.Bytes32Set)](uploads/1696571680645.sol#L1063-L1065) is never used and should be removed
  
  uploads/1696571680645.sol#L1063-L1065
  
  - [ ] ID-22
    [EnumerableSet.at(EnumerableSet.Bytes32Set,uint256)](uploads/1696571680645.sol#L1077-L1079) is never used and should be removed
  
  uploads/1696571680645.sol#L1077-L1079
  
  - [ ] ID-23
    [Address.sendValue(address,uint256)](uploads/1696571680645.sol#L60-L65) is never used and should be removed
  
  uploads/1696571680645.sol#L60-L65
  
  - [ ] ID-24
    [Address.functionCallWithValue(address,bytes,uint256)](uploads/1696571680645.sol#L114-L120) is never used and should be removed
  
  uploads/1696571680645.sol#L114-L120
  
  - [ ] ID-25
    [EnumerableSet.contains(EnumerableSet.Bytes32Set,bytes32)](uploads/1696571680645.sol#L1056-L1058) is never used and should be removed
  
  uploads/1696571680645.sol#L1056-L1058
  
  - [ ] ID-26
    [Address.functionDelegateCall(address,bytes,string)](uploads/1696571680645.sol#L180-L187) is never used and should be removed
  
  uploads/1696571680645.sol#L180-L187
  
  - [ ] ID-27
    [SafeMath.percentageOfTotal(uint256,uint256)](uploads/1696571680645.sol#L539-L541) is never used and should be removed
  
  uploads/1696571680645.sol#L539-L541
  
  - [ ] ID-28
    [SafeMath.sub(uint256,uint256,string)](uploads/1696571680645.sol#L399-L408) is never used and should be removed
  
  uploads/1696571680645.sol#L399-L408
  
  - [ ] ID-29
    [SafeMath.percentageAmount(uint256,uint8)](uploads/1696571680645.sol#L528-L530) is never used and should be removed
  
  uploads/1696571680645.sol#L528-L530
  
  - [ ] ID-30
    [SafeMath.bondingCurve(uint256,uint256)](uploads/1696571680645.sol#L557-L559) is never used and should be removed
  
  uploads/1696571680645.sol#L557-L559
  
  - [ ] ID-31
    [Address.functionDelegateCall(address,bytes)](uploads/1696571680645.sol#L170-L172) is never used and should be removed
  
  uploads/1696571680645.sol#L170-L172
  
  - [ ] ID-32
    [SafeERC20.safeIncreaseAllowance(IERC20,address,uint256)](uploads/1696571680645.sol#L681-L688) is never used and should be removed
  
  uploads/1696571680645.sol#L681-L688
  
  - [ ] ID-33
    [SafeERC20.safePermit(IERC20Permit,address,address,uint256,uint256,uint8,bytes32,bytes32)](uploads/1696571680645.sol#L703-L717) is never used and should be removed
  
  uploads/1696571680645.sol#L703-L717
  
  - [ ] ID-34
    [EnumerableSet.values(EnumerableSet.AddressSet)](uploads/1696571680645.sol#L1155-L1165) is never used and should be removed
  
  uploads/1696571680645.sol#L1155-L1165
  
  - [ ] ID-35
    [EnumerableSet.remove(EnumerableSet.AddressSet,address)](uploads/1696571680645.sol#L1115-L1117) is never used and should be removed
  
  uploads/1696571680645.sol#L1115-L1117
  
  - [ ] ID-36
    [SafeMath.sqrrt(uint256)](uploads/1696571680645.sol#L512-L523) is never used and should be removed
  
  uploads/1696571680645.sol#L512-L523
  
  - [ ] ID-37
    [SafeERC20.safeApprove(IERC20,address,uint256)](uploads/1696571680645.sol#L666-L679) is never used and should be removed
  
  uploads/1696571680645.sol#L666-L679
  
  - [ ] ID-38
    [SafeMath.quadraticPricing(uint256,uint256)](uploads/1696571680645.sol#L553-L555) is never used and should be removed
  
  uploads/1696571680645.sol#L553-L555
  
  - [ ] ID-39
    [SafeMath.mod(uint256,uint256,string)](uploads/1696571680645.sol#L502-L509) is never used and should be removed
  
  uploads/1696571680645.sol#L502-L509
  
  - [ ] ID-40
    [EnumerableSet.contains(EnumerableSet.AddressSet,address)](uploads/1696571680645.sol#L1122-L1124) is never used and should be removed
  
  uploads/1696571680645.sol#L1122-L1124
  
  - [ ] ID-41
    [EnumerableSet.add(EnumerableSet.Bytes32Set,bytes32)](uploads/1696571680645.sol#L1039-L1041) is never used and should be removed
  
  uploads/1696571680645.sol#L1039-L1041
  
  - [ ] ID-42
    [EnumerableSet._values(EnumerableSet.Set)](uploads/1696571680645.sol#L1023-L1025) is never used and should be removed
  
  uploads/1696571680645.sol#L1023-L1025
  
  - [ ] ID-43
    [EnumerableSet.values(EnumerableSet.UintSet)](uploads/1696571680645.sol#L1229-L1239) is never used and should be removed
  
  uploads/1696571680645.sol#L1229-L1239
  
  - [ ] ID-44
    [Context._msgData()](uploads/1696571680645.sol#L766-L768) is never used and should be removed
  
  uploads/1696571680645.sol#L766-L768
  
  - [ ] ID-45
    [Address.functionStaticCall(address,bytes)](uploads/1696571680645.sol#L145-L147) is never used and should be removed
  
  uploads/1696571680645.sol#L145-L147
  
  - [ ] ID-46
    [SafeMath.mod(uint256,uint256)](uploads/1696571680645.sol#L486-L488) is never used and should be removed
  
  uploads/1696571680645.sol#L486-L488
  
  - [ ] ID-47
    [SafeMath.substractPercentage(uint256,uint8)](uploads/1696571680645.sol#L535-L537) is never used and should be removed
  
  uploads/1696571680645.sol#L535-L537
  
  - [ ] ID-48
    [SafeERC20.safeDecreaseAllowance(IERC20,address,uint256)](uploads/1696571680645.sol#L690-L701) is never used and should be removed
  
  uploads/1696571680645.sol#L690-L701
  
  - [ ] ID-49
    [Address.functionStaticCall(address,bytes,string)](uploads/1696571680645.sol#L155-L162) is never used and should be removed
  
  uploads/1696571680645.sol#L155-L162
  
  - [ ] ID-50
    [EnumerableSet.remove(EnumerableSet.Bytes32Set,bytes32)](uploads/1696571680645.sol#L1049-L1051) is never used and should be removed
  
  uploads/1696571680645.sol#L1049-L1051
  
  - [ ] ID-51
    [Address.functionCall(address,bytes)](uploads/1696571680645.sol#L85-L87) is never used and should be removed
  
  uploads/1696571680645.sol#L85-L87
  
  ## solc-version
  
  Impact: Informational
  Confidence: High
  
  - [ ] ID-52
    Pragma version[^0.8.1](uploads/1696571680645.sol#L4) allows old versions
  
  uploads/1696571680645.sol#L4
  
  - [ ] ID-53
    solc-0.8.21 is not recommended for deployment
  
  ## low-level-calls
  
  Impact: Informational
  Confidence: High
  
  - [ ] ID-54
    Low level call in [Address.functionCallWithValue(address,bytes,uint256,string)](uploads/1696571680645.sol#L128-L137):
    - [(success,returndata) = target.call{value: value}(data)](uploads/1696571680645.sol#L135)
  
  uploads/1696571680645.sol#L128-L137
  
  - [ ] ID-55
    Low level call in [Address.sendValue(address,uint256)](uploads/1696571680645.sol#L60-L65):
    - [(success) = recipient.call{value: amount}()](uploads/1696571680645.sol#L63)
  
  uploads/1696571680645.sol#L60-L65
  
  - [ ] ID-56
    Low level call in [Address.functionStaticCall(address,bytes,string)](uploads/1696571680645.sol#L155-L162):
    - [(success,returndata) = target.staticcall(data)](uploads/1696571680645.sol#L160)
  
  uploads/1696571680645.sol#L155-L162
  
  - [ ] ID-57
    Low level call in [Address.functionDelegateCall(address,bytes,string)](uploads/1696571680645.sol#L180-L187):
    - [(success,returndata) = target.delegatecall(data)](uploads/1696571680645.sol#L185)
  
  uploads/1696571680645.sol#L180-L187
  
  ## naming-convention
  
  Impact: Informational
  Confidence: High
  
  - [ ] ID-58
    Constant [Operator.baseRate](uploads/1696571680645.sol#L852) is not in UPPER_CASE_WITH_UNDERSCORES
  
  uploads/1696571680645.sol#L852
  
  - [ ] ID-59
    Function [IERC20Permit.DOMAIN_SEPARATOR()](uploads/1696571680645.sol#L625) is not in mixedCase
  
  uploads/1696571680645.sol#L625
  
  ## reentrancy-unlimited-gas
  
  Impact: Informational
  Confidence: Medium
  
  - [ ] ID-60
    Reentrancy in [ActivityPool.claim(uint256)](uploads/1696571680645.sol#L1417-L1429):
    External calls:
    - [address(msg.sender).transfer(amount)](uploads/1696571680645.sol#L1425)
      Event emitted after the call(s):
    - [Claim(msg.sender,pID,betInfo[id].bType,amount)](uploads/1696571680645.sol#L1428)
  
  uploads/1696571680645.sol#L1417-L1429
  
  ## unused-state
  
  Impact: Informational
  Confidence: High
  
  - [ ] ID-61
    [Operator.baseRate](uploads/1696571680645.sol#L852) is never used in [ActivityPool](uploads/1696571680645.sol#L1243-L1648)
  
  uploads/1696571680645.sol#L852`
  ;

const result = parseSlitherOutput(sampleStdout);

// Print the output
console.log('Parsed output:', JSON.stringify(result, null, 2));