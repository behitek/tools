## **Personal Income Tax Brackets (2025)**

Individuals with taxable income above 11 million VND/month (132 million VND/year) are subject to personal income tax.

**Progressive Tax Rates:**
- **Level 1:** Up to 5 million VND → 5%
- **Level 2:** Over 5 million to 10 million VND → 10%
- **Level 3:** Over 10 million to 18 million VND → 15%
- **Level 4:** Over 18 million to 32 million VND → 20%
- **Level 5:** Over 32 million to 52 million VND → 25%
- **Level 6:** Over 52 million to 80 million VND → 30%
- **Level 7:** Over 80 million VND → 35%

**Deductions:**
- Personal deduction: **11,000,000 VND/month**
- Dependent deduction: **4,400,000 VND/person/month**

---

## **Maximum Contribution Bases by Region (2025)**

### Social Insurance & Health Insurance:
Maximum salary base equals 20 times the base salary. With current base salary of 2.34 million VND/month, the maximum is approximately 46.8 million VND/month.

### Unemployment Insurance:
Maximum equals 20 times the regional minimum wage.

**Regional Minimum Wages (effective from July 1, 2024):**
- **Region I:** 4,960,000 VND/month → Max BHTN: 99,200,000 VND
- **Region II:** 4,410,000 VND/month → Max BHTN: 88,200,000 VND
- **Region III:** 3,860,000 VND/month → Max BHTN: 77,200,000 VND
- **Region IV:** 3,450,000 VND/month → Max BHTN: 69,000,000 VND

---

## **Insurance Contribution Rates (2025)**

Total mandatory insurance contribution is 32% of gross salary:

**Employee Contribution (10.5% total):**
- Social Insurance (BHXH): **8%**
- Health Insurance (BHYT): **1.5%**
- Unemployment Insurance (BHTN): **1%**

**Employer Contribution (21.5% total):**
- BHXH - Retirement & Death: 14%
- BHXH - Sickness & Maternity: 3%
- Work-related Accident Insurance: 0.5%
- BHTN: 1%
- BHYT: 3%

---

## **Formulas**

### **Gross to Net Conversion:**

```
Step 1: Calculate mandatory insurance contributions
Insurance_Employee = Gross × 10.5%
  - BHXH = Gross × 8% (capped at 46.8M)
  - BHYT = Gross × 1.5% (capped at 46.8M)
  - BHTN = Gross × 1% (capped at regional max)

Step 2: Calculate taxable income
Taxable_Income = Gross - Insurance_Employee - Personal_Deduction - (Dependent_Deduction × Number_of_Dependents)

Step 3: Calculate PIT using progressive rates
PIT = Calculate based on tax brackets above

Step 4: Calculate Net salary
Net = Gross - Insurance_Employee - PIT
```

### **Net to Gross Conversion (Reverse):**

This requires iterative calculation or solving equations since insurance and tax are based on gross:

```
Method 1: Binary search algorithm
- Start with estimated Gross
- Calculate Net using Gross→Net formula
- Adjust Gross until calculated Net matches target Net
- Precision: ±1,000 VND

Method 2: Approximation formula (for quick estimate)
Gross_estimate = Net / (1 - 0.105 - Average_Tax_Rate)
Then refine using binary search
```

### **Key Calculation Notes:**

1. **Insurance caps must be applied separately:**
   - BHXH + BHYT capped at 46.8M
   - BHTN capped based on region

2. **Tax calculation applies progressive brackets** (not flat rate on total)

3. **Salary components included in insurance base:**
   - Base salary + position allowances + regular supplements
   - **Excluded:** bonuses, meal allowances, travel support, housing support, innovation rewards

4. **For calculations, always:**
   - Calculate insurance first
   - Subtract deductions from after-insurance amount
   - Apply progressive tax only if taxable income > 0
   - Round final amounts appropriately
