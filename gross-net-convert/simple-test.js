// Simple test to verify calculations
console.log("Testing salary calculations...");

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
    const bhxh = gross * (config.bhxh / 100);
    const bhyt = gross * (config.bhyt / 100);
    const bhtn = gross * (config.bhtn / 100);
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
        taxableIncome,
        tax,
        net,
    };
}

// Test case: 20M gross, 0 dependents
const result = calculateGrossToNet(20000000, 0);
console.log("Gross:", result.gross);
console.log("Insurance:", result.totalInsurance);
console.log("Taxable Income:", result.taxableIncome);
console.log("Tax:", result.tax);
console.log("Net:", result.net);