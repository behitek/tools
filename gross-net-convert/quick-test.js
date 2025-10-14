// Quick verification test
const config = {
    bhxh: 8,
    bhyt: 1.5,
    bhtn: 1,
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
    insuranceCapBhxhBhyt: 46800000,
    insuranceCapBhtn: 99200000,
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

    return { gross, bhxh, bhyt, bhtn, totalInsurance, taxableIncome, tax, net };
}

// Test cases
console.log("=== TESTING SALARY CALCULATIONS ===");

// Test 1: 20M gross, 0 dependents
console.log("\n1. Testing 20M gross, 0 dependents:");
const test1 = calculateGrossToNet(20000000, 0);
console.log(`Gross: ${test1.gross.toLocaleString()}`);
console.log(`Insurance: ${test1.totalInsurance.toLocaleString()}`);
console.log(`Taxable: ${test1.taxableIncome.toLocaleString()}`);
console.log(`Tax: ${test1.tax.toLocaleString()}`);
console.log(`Net: ${test1.net.toLocaleString()}`);

// Test 2: High salary to test caps
console.log("\n2. Testing 100M gross (should hit insurance caps):");
const test2 = calculateGrossToNet(100000000, 0);
console.log(`Gross: ${test2.gross.toLocaleString()}`);
console.log(`BHXH (8% of ${config.insuranceCapBhxhBhyt.toLocaleString()}): ${test2.bhxh.toLocaleString()}`);
console.log(`BHYT (1.5% of ${config.insuranceCapBhxhBhyt.toLocaleString()}): ${test2.bhyt.toLocaleString()}`);
console.log(`BHTN (1% of ${config.insuranceCapBhtn.toLocaleString()}): ${test2.bhtn.toLocaleString()}`);
console.log(`Insurance: ${test2.totalInsurance.toLocaleString()}`);
console.log(`Taxable: ${test2.taxableIncome.toLocaleString()}`);
console.log(`Tax: ${test2.tax.toLocaleString()}`);
console.log(`Net: ${test2.net.toLocaleString()}`);

// Test 3: Manual verification case
console.log("\n3. Manual verification - 30M gross, 1 dependent:");
const test3 = calculateGrossToNet(30000000, 1);
console.log(`Expected tax calculation for taxable ${test3.taxableIncome.toLocaleString()}:`);
console.log(`- First 5M at 5%: ${(5000000 * 0.05).toLocaleString()}`);
console.log(`- Next 5M at 10%: ${(5000000 * 0.10).toLocaleString()}`);
console.log(`- Next ${(test3.taxableIncome - 10000000).toLocaleString()} at 15%: ${((test3.taxableIncome - 10000000) * 0.15).toLocaleString()}`);
console.log(`- Total expected: ${(250000 + 500000 + (test3.taxableIncome - 10000000) * 0.15).toLocaleString()}`);
console.log(`- Actual tax: ${test3.tax.toLocaleString()}`);
console.log(`- Net: ${test3.net.toLocaleString()}`);

console.log("\n=== TESTS COMPLETED ===");