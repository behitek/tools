// Test script to verify salary calculations according to Vietnam 2025 tax law
// Based on the specifications in INFO.md

// Configuration from the app
const config = {
    bhxh: 8,
    bhyt: 1.5,
    bhtn: 1,
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
    taxBrackets: [
        { limit: 5000000, rate: 5 },
        { limit: 10000000, rate: 10 },
        { limit: 18000000, rate: 15 },
        { limit: 32000000, rate: 20 },
        { limit: 52000000, rate: 25 },
        { limit: 80000000, rate: 30 },
        { limit: Number.POSITIVE_INFINITY, rate: 35 },
    ],
}

// Constants from INFO.md
const INSURANCE_CAP_BHXH_BHYT = 46800000; // 46.8M VND
const INSURANCE_CAP_BHTN_REGION_1 = 99200000; // Region I max

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
    // Apply insurance caps as per INFO.md
    const bhxhBase = Math.min(gross, INSURANCE_CAP_BHXH_BHYT);
    const bhytBase = Math.min(gross, INSURANCE_CAP_BHXH_BHYT);
    const bhtnBase = Math.min(gross, INSURANCE_CAP_BHTN_REGION_1);

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

function runTest(testName, gross, dependents = 0) {
    console.log(`\n=== ${testName} ===`);
    console.log(`Input: Gross = ${formatCurrency(gross)}, Dependents = ${dependents}`);

    const result = calculateGrossToNet(gross, dependents);

    console.log(`BHXH (8%): ${formatCurrency(result.bhxh)}`);
    console.log(`BHYT (1.5%): ${formatCurrency(result.bhyt)}`);
    console.log(`BHTN (1%): ${formatCurrency(result.bhtn)}`);
    console.log(`Total Insurance: ${formatCurrency(result.totalInsurance)}`);
    console.log(`Income after Insurance: ${formatCurrency(result.incomeAfterInsurance)}`);
    console.log(`Total Deductions: ${formatCurrency(result.totalDeduction)}`);
    console.log(`Taxable Income: ${formatCurrency(result.taxableIncome)}`);
    console.log(`Personal Income Tax: ${formatCurrency(result.tax)}`);
    console.log(`NET SALARY: ${formatCurrency(result.net)}`);

    // Test reverse calculation
    const calculatedGross = calculateNetToGross(result.net, dependents);
    const reverseResult = calculateGrossToNet(calculatedGross, dependents);
    console.log(`\n--- Reverse Calculation Test ---`);
    console.log(`Target Net: ${formatCurrency(result.net)}`);
    console.log(`Calculated Gross: ${formatCurrency(calculatedGross)}`);
    console.log(`Actual Net from Calculated Gross: ${formatCurrency(reverseResult.net)}`);
    console.log(`Difference: ${formatCurrency(Math.abs(result.net - reverseResult.net))}`);
    console.log(`Reverse calculation ${Math.abs(result.net - reverseResult.net) < 1000 ? 'PASSED' : 'FAILED'}`);

    return result;
}

// Test Cases
console.log("VIETNAM SALARY CALCULATOR - TEST SUITE");
console.log("Based on 2025 tax law specifications from INFO.md\n");

// Test 1: Low salary (below tax threshold)
runTest("Test 1: Low Salary (Below Tax Threshold)", 15000000, 0);

// Test 2: Medium salary (first tax bracket)
runTest("Test 2: Medium Salary (First Tax Bracket)", 20000000, 0);

// Test 3: High salary (multiple tax brackets)
runTest("Test 3: High Salary (Multiple Tax Brackets)", 50000000, 0);

// Test 4: Very high salary (testing insurance caps)
runTest("Test 4: Very High Salary (Insurance Caps Apply)", 100000000, 0);

// Test 5: With dependents
runTest("Test 5: Medium Salary with 2 Dependents", 25000000, 2);

// Test 6: Edge case - exactly at insurance cap
runTest("Test 6: Salary at Insurance Cap", 46800000, 0);

// Test 7: Manual verification case
console.log("\n=== MANUAL VERIFICATION ===");
console.log("Testing 30M gross with 1 dependent:");
const manual = calculateGrossToNet(30000000, 1);
console.log("Expected calculations:");
console.log("- BHXH: 30M × 8% = 2,400,000");
console.log("- BHYT: 30M × 1.5% = 450,000");
console.log("- BHTN: 30M × 1% = 300,000");
console.log("- Total Insurance: 3,150,000");
console.log("- Income after insurance: 30M - 3.15M = 26,850,000");
console.log("- Deductions: 11M + 4.4M = 15,400,000");
console.log("- Taxable income: 26.85M - 15.4M = 11,450,000");
console.log("- Tax calculation:");
console.log("  * First 5M at 5%: 250,000");
console.log("  * Next 5M at 10%: 500,000");
console.log("  * Next 1.45M at 15%: 217,500");
console.log("  * Total tax: 967,500");
console.log("- Net: 30M - 3.15M - 0.9675M = 25,882,500");

console.log("\nActual calculations:");
console.log(`Tax calculated: ${formatCurrency(manual.tax)}`);
console.log(`Net calculated: ${formatCurrency(manual.net)}`);