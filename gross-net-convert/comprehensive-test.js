#!/usr/bin/env node

// Comprehensive test suite for Vietnam salary calculator
// Tests both gross-to-net and net-to-gross calculations
// Based on INFO.md specifications for 2025

const config = {
    bhxh: 8,
    bhyt: 1.5,
    bhtn: 1,
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
    // Insurance caps as per INFO.md
    insuranceCapBhxhBhyt: 46800000, // 46.8M VND
    insuranceCapBhtn: 99200000, // 99.2M VND (Region I)
    taxBrackets: [
        { limit: 5000000, rate: 5 },
        { limit: 10000000, rate: 10 },
        { limit: 18000000, rate: 15 },
        { limit: 32000000, rate: 20 },
        { limit: 52000000, rate: 25 },
        { limit: 80000000, rate: 30 },
        { limit: Number.POSITIVE_INFINITY, rate: 35 },
    ],
};

function calculateTax(taxableIncome) {
    let tax = 0;
    let previousLimit = 0;

    for (const bracket of config.taxBrackets) {
        if (taxableIncome <= previousLimit) break;

        const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
        tax += taxableInBracket * (bracket.rate / 100);
        previousLimit = bracket.limit;

        if (taxableIncome <= bracket.limit) break;
    }

    return tax;
}

function calculateGrossToNet(gross, dependents = 0) {
    // Apply insurance caps as per INFO.md specifications
    const bhxhBase = Math.min(gross, config.insuranceCapBhxhBhyt);
    const bhytBase = Math.min(gross, config.insuranceCapBhxhBhyt);
    const bhtnBase = Math.min(gross, config.insuranceCapBhtn);

    const bhxh = bhxhBase * (config.bhxh / 100);
    const bhyt = bhytBase * (config.bhyt / 100);
    const bhtn = bhtnBase * (config.bhtn / 100);
    const totalInsurance = bhxh + bhyt + bhtn;

    const incomeAfterInsurance = gross - totalInsurance;
    const totalDeduction = config.personalDeduction + dependents * config.dependentDeduction;
    const taxableIncome = Math.max(0, incomeAfterInsurance - totalDeduction);

    const tax = calculateTax(taxableIncome);
    const net = gross - totalInsurance - tax;

    return {
        gross,
        bhxh,
        bhyt,
        bhtn,
        totalInsurance,
        incomeAfterInsurance,
        totalDeduction,
        taxableIncome,
        tax,
        net,
    };
}

function calculateNetToGross(targetNet, dependents = 0) {
    // Binary search for gross salary
    let low = targetNet;
    let high = targetNet * 2;
    let iterations = 0;
    const maxIterations = 100;

    while (iterations < maxIterations) {
        const mid = (low + high) / 2;
        const result = calculateGrossToNet(mid, dependents);

        if (Math.abs(result.net - targetNet) < 1000) {
            return mid;
        }

        if (result.net < targetNet) {
            low = mid;
        } else {
            high = mid;
        }

        iterations++;
    }

    return (low + high) / 2;
}

function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " VND";
}

function runTest(testName, gross, dependents = 0, shouldTestReverse = true) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 ${testName}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📊 Input: Gross = ${formatCurrency(gross)}, Dependents = ${dependents}`);

    const result = calculateGrossToNet(gross, dependents);

    console.log(`\n📋 CALCULATION BREAKDOWN:`);
    console.log(`   Gross Salary:           ${formatCurrency(result.gross)}`);
    console.log(`   ├─ BHXH (8%):          ${formatCurrency(result.bhxh)} (base: ${formatCurrency(Math.min(gross, config.insuranceCapBhxhBhyt))})`);
    console.log(`   ├─ BHYT (1.5%):        ${formatCurrency(result.bhyt)} (base: ${formatCurrency(Math.min(gross, config.insuranceCapBhxhBhyt))})`);
    console.log(`   └─ BHTN (1%):          ${formatCurrency(result.bhtn)} (base: ${formatCurrency(Math.min(gross, config.insuranceCapBhtn))})`);
    console.log(`   Total Insurance:        ${formatCurrency(result.totalInsurance)}`);
    console.log(`   Income after Insurance: ${formatCurrency(result.incomeAfterInsurance)}`);
    console.log(`   Total Deductions:       ${formatCurrency(result.totalDeduction)}`);
    console.log(`   Taxable Income:         ${formatCurrency(result.taxableIncome)}`);
    console.log(`   Personal Income Tax:    ${formatCurrency(result.tax)}`);
    console.log(`   🎯 NET SALARY:          ${formatCurrency(result.net)}`);

    // Test reverse calculation
    if (shouldTestReverse) {
        const calculatedGross = calculateNetToGross(result.net, dependents);
        const reverseResult = calculateGrossToNet(calculatedGross, dependents);
        console.log(`\n🔄 REVERSE CALCULATION TEST:`);
        console.log(`   Target Net:             ${formatCurrency(result.net)}`);
        console.log(`   Calculated Gross:       ${formatCurrency(calculatedGross)}`);
        console.log(`   Actual Net from Calc:   ${formatCurrency(reverseResult.net)}`);
        console.log(`   Difference:             ${formatCurrency(Math.abs(result.net - reverseResult.net))}`);
        const passed = Math.abs(result.net - reverseResult.net) < 1000;
        console.log(`   Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    }

    return result;
}

// Test Suite
console.log(`
🏛️  VIETNAM SALARY CALCULATOR - TEST SUITE 2025
📋 Based on tax law specifications from INFO.md
🔧 Testing with insurance caps applied
`);

// Test 1: Low salary (below tax threshold)
runTest("Low Salary (Below Tax Threshold)", 15000000, 0);

// Test 2: Medium salary (first tax bracket)
runTest("Medium Salary (First Tax Bracket)", 25000000, 0);

// Test 3: High salary (multiple tax brackets)
runTest("High Salary (Multiple Tax Brackets)", 50000000, 0);

// Test 4: Very high salary (testing insurance caps)
runTest("Very High Salary (Insurance Caps Apply)", 100000000, 0);

// Test 5: At insurance cap threshold
runTest("Salary at BHXH/BHYT Cap (46.8M)", 46800000, 0);

// Test 6: Just above insurance cap
runTest("Salary Just Above Insurance Cap (50M)", 50000000, 1);

// Test 7: With multiple dependents
runTest("High Salary with Multiple Dependents", 60000000, 3);

// Test 8: Edge case - exactly at personal deduction threshold
const atThreshold = config.personalDeduction + 5000000; // Just above threshold
runTest("Salary Just Above Personal Deduction", atThreshold, 0);

// Manual verification test
console.log(`\n${'='.repeat(60)}`);
console.log(`🔍 MANUAL VERIFICATION`);
console.log(`${'='.repeat(60)}`);
console.log(`Testing 30M gross with 1 dependent against expected calculations:`);

const manual = calculateGrossToNet(30000000, 1);
console.log(`\n📊 Expected vs Actual:`);
console.log(`   BHXH: 30M × 8% = 2,400,000        → Actual: ${formatCurrency(manual.bhxh)}`);
console.log(`   BHYT: 30M × 1.5% = 450,000        → Actual: ${formatCurrency(manual.bhyt)}`);
console.log(`   BHTN: 30M × 1% = 300,000          → Actual: ${formatCurrency(manual.bhtn)}`);
console.log(`   Total Insurance: 3,150,000        → Actual: ${formatCurrency(manual.totalInsurance)}`);
console.log(`   Income after ins: 26,850,000      → Actual: ${formatCurrency(manual.incomeAfterInsurance)}`);
console.log(`   Deductions: 11M + 4.4M = 15,400,000 → Actual: ${formatCurrency(manual.totalDeduction)}`);
console.log(`   Taxable: 26.85M - 15.4M = 11,450,000 → Actual: ${formatCurrency(manual.taxableIncome)}`);

// Tax calculation breakdown
console.log(`\n📈 Tax Calculation Breakdown:`);
console.log(`   First 5M at 5%:  250,000`);
console.log(`   Next 5M at 10%:  500,000`);
console.log(`   Next 1.45M at 15%: 217,500`);
console.log(`   Expected total tax: 967,500        → Actual: ${formatCurrency(manual.tax)}`);
console.log(`   Expected net: 25,882,500          → Actual: ${formatCurrency(manual.net)}`);

const taxMatch = Math.abs(manual.tax - 967500) < 100;
const netMatch = Math.abs(manual.net - 25882500) < 100;

console.log(`\n✅ Verification Results:`);
console.log(`   Tax calculation: ${taxMatch ? '✅ CORRECT' : '❌ INCORRECT'}`);
console.log(`   Net calculation: ${netMatch ? '✅ CORRECT' : '❌ INCORRECT'}`);

console.log(`\n${'='.repeat(60)}`);
console.log(`🎯 TEST SUITE COMPLETED`);
console.log(`${'='.repeat(60)}`);