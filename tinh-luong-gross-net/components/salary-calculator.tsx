"use client"

import { SettingsDialog } from "@/components/settings-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Moon, Settings, Sun } from "lucide-react"
import { useEffect, useState } from "react"

// Default configuration for Vietnam 2025
const DEFAULT_CONFIG = {
  bhxh: 8,
  bhyt: 1.5,
  bhtn: 1,
  personalDeduction: 11000000,
  dependentDeduction: 4400000,
  // Insurance caps as per INFO.md
  insuranceCapBhxhBhyt: 46800000, // 46.8M VND (20 × 2.34M base salary)
  insuranceCapBhtn: 99200000, // 99.2M VND (Region I: 20 × 4.96M minimum wage)
  region: "I", // Default region for BHTN calculation
  regionMinWage: 4960000, // Region I minimum wage
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

type Config = typeof DEFAULT_CONFIG

export function SalaryCalculator() {
  const [mode, setMode] = useState<"gross-to-net" | "net-to-gross">("gross-to-net")
  const [salary, setSalary] = useState<string>("20000000")
  const [dependents, setDependents] = useState<string>("0")
  const [useCustomInsuranceBase, setUseCustomInsuranceBase] = useState(false)
  const [insuranceBaseSalary, setInsuranceBaseSalary] = useState<string>("5000000")
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isModified, setIsModified] = useState(false)

  // Calculate if config is modified
  useEffect(() => {
    const modified = JSON.stringify(config) !== JSON.stringify(DEFAULT_CONFIG)
    setIsModified(modified)
  }, [config])

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(Math.round(value))
  }

  const calculateTax = (taxableIncome: number): number => {
    let tax = 0
    let previousLimit = 0

    for (const bracket of config.taxBrackets) {
      if (taxableIncome <= previousLimit) break

      const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit
      tax += taxableInBracket * (bracket.rate / 100)
      previousLimit = bracket.limit

      if (taxableIncome <= bracket.limit) break
    }

    return tax
  }

  const calculateGrossToNet = (gross: number, deps: number) => {
    // Determine insurance base - use custom base if specified, otherwise use gross salary
    const insuranceBase = useCustomInsuranceBase ? Number.parseFloat(insuranceBaseSalary) || 0 : gross
    
    // Apply insurance caps as per INFO.md specifications
    const bhxhBase = Math.min(insuranceBase, config.insuranceCapBhxhBhyt)
    const bhytBase = Math.min(insuranceBase, config.insuranceCapBhxhBhyt)
    const bhtnBase = Math.min(insuranceBase, config.insuranceCapBhtn)

    const bhxh = bhxhBase * (config.bhxh / 100)
    const bhyt = bhytBase * (config.bhyt / 100)
    const bhtn = bhtnBase * (config.bhtn / 100)
    const totalInsurance = bhxh + bhyt + bhtn

    const incomeAfterInsurance = gross - totalInsurance
    const totalDeduction = config.personalDeduction + deps * config.dependentDeduction
    const taxableIncome = Math.max(0, incomeAfterInsurance - totalDeduction)

    const tax = calculateTax(taxableIncome)
    const net = gross - totalInsurance - tax

    return {
      gross,
      bhxh,
      bhyt,
      bhtn,
      totalInsurance,
      taxableIncome,
      tax,
      net,
    }
  }

  const calculateNetToGross = (targetNet: number, deps: number): number => {
    // Binary search for gross salary
    let low = targetNet
    let high = targetNet * 2
    let iterations = 0
    const maxIterations = 100

    while (iterations < maxIterations) {
      const mid = (low + high) / 2
      const result = calculateGrossToNet(mid, deps)

      if (Math.abs(result.net - targetNet) < 1000) {
        return mid
      }

      if (result.net < targetNet) {
        low = mid
      } else {
        high = mid
      }

      iterations++
    }

    return (low + high) / 2
  }

  const getResults = () => {
    const salaryNum = Number.parseFloat(salary) || 0
    const depsNum = Number.parseInt(dependents) || 0

    if (mode === "gross-to-net") {
      return calculateGrossToNet(salaryNum, depsNum)
    } else {
      const calculatedGross = calculateNetToGross(salaryNum, depsNum)
      return calculateGrossToNet(calculatedGross, depsNum)
    }
  }

  const results = getResults()

  return (
    <>
      <Card className="backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Máy Tính Lương</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="transition-transform hover:scale-110"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="relative transition-transform hover:scale-110"
              >
                <Settings className="h-5 w-5" />
                {isModified && <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Toggle */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant={mode === "gross-to-net" ? "default" : "outline"}
                onClick={() => setMode("gross-to-net")}
                className="flex-1 transition-all"
              >
                <span className="flex items-center gap-2">
                  Gross → <span className="text-green-400">🎯 Net</span>
                </span>
              </Button>
              <Button
                variant={mode === "net-to-gross" ? "default" : "outline"}
                onClick={() => setMode("net-to-gross")}
                className="flex-1 transition-all"
              >
                <span className="flex items-center gap-2">
                  Net → <span className="text-blue-400">🎯 Gross</span>
                </span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              🎯 {mode === "gross-to-net" ? "Kết quả Net sẽ được làm nổi bật" : "Kết quả Gross sẽ được làm nổi bật"}
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="salary">{mode === "gross-to-net" ? "Lương Gross (VNĐ)" : "Lương Net (VNĐ)"}</Label>
              <Input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "")
                  setSalary(value)
                }}
                placeholder="20000000"
                className="text-lg mt-1"
              />
            </div>

            <div>
              <Label htmlFor="dependents">Số người phụ thuộc</Label>
              <Input
                id="dependents"
                type="number"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                min="0"
                placeholder="0"
                className="text-lg mt-1"
              />
            </div>

            {/* Insurance Base Settings */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="customInsurance"
                  checked={useCustomInsuranceBase}
                  onChange={(e) => setUseCustomInsuranceBase(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="customInsurance" className="text-sm font-medium">
                  Sử dụng mức lương đóng bảo hiểm riêng
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 Nhiều công ty chỉ đóng bảo hiểm trên mức tối thiểu (5-10 triệu) thay vì lương chính thức
              </p>
              
              {useCustomInsuranceBase && (
                <div>
                  <Label htmlFor="insuranceBase">Mức lương đóng bảo hiểm (VNĐ)</Label>
                  <Input
                    id="insuranceBase"
                    type="text"
                    value={insuranceBaseSalary}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "")
                      setInsuranceBaseSalary(value)
                    }}
                    placeholder="5000000"
                    className="text-lg mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Mức lương thực tế dùng để tính bảo hiểm (thường 5-10 triệu)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Breakdown */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Chi tiết tính toán</h3>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Vùng {config.region}</p>
                <p className="text-xs text-muted-foreground">
                  Lương tối thiểu: {formatCurrency(config.regionMinWage)} ₫
                </p>
              </div>
            </div>

            <ResultRow 
              label="Lương Gross" 
              value={results.gross} 
              color="text-blue-600 dark:text-blue-400" 
              highlighted={mode === "net-to-gross"}
            />

            <div className="pl-4 space-y-2 border-l-2 border-orange-300">
              <ResultRow
                label={`BHXH (${config.bhxh}%)`}
                value={results.bhxh}
                color="text-orange-600 dark:text-orange-400"
                small
              />
              <ResultRow
                label={`BHYT (${config.bhyt}%)`}
                value={results.bhyt}
                color="text-orange-600 dark:text-orange-400"
                small
              />
              <ResultRow
                label={`BHTN (${config.bhtn}%)`}
                value={results.bhtn}
                color="text-orange-600 dark:text-orange-400"
                small
              />
              
              {useCustomInsuranceBase && (
                <div className="pt-2 border-t border-orange-200">
                  <p className="text-xs text-muted-foreground">
                    💡 Tính trên mức đóng BH: {formatCurrency(Number.parseFloat(insuranceBaseSalary) || 0)} ₫
                  </p>
                </div>
              )}
            </div>

            <ResultRow
              label="Thu nhập chịu thuế"
              value={results.taxableIncome}
              color="text-purple-600 dark:text-purple-400"
            />

            <ResultRow label="Thuế TNCN" value={results.tax} color="text-red-600 dark:text-red-400" />

            <div className="pt-3 border-t-2">
              <ResultRow 
                label="Lương Net" 
                value={results.net} 
                color="text-green-600 dark:text-green-400" 
                bold 
                highlighted={mode === "gross-to-net"}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        config={config}
        onConfigChange={setConfig}
        onReset={() => setConfig(DEFAULT_CONFIG)}
      />
    </>
  )
}

function ResultRow({
  label,
  value,
  color,
  small = false,
  bold = false,
  highlighted = false,
}: {
  label: string
  value: number
  color: string
  small?: boolean
  bold?: boolean
  highlighted?: boolean
}) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(Math.round(value))
  }

  return (
    <div className={`flex justify-between items-center ${highlighted ? "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 p-3 rounded-lg border-l-4 border-yellow-400 shadow-sm" : ""}`}>
      <span className={`${small ? "text-sm" : ""} ${bold ? "font-semibold" : ""} ${highlighted ? "font-semibold" : ""}`}>
        {highlighted && "🎯 "}{label}
      </span>
      <span className={`${color} ${bold ? "font-bold text-xl" : "font-medium"} ${highlighted ? "font-bold text-xl" : ""}`}>{formatCurrency(value)} ₫</span>
    </div>
  )
}
