"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

type Config = {
  bhxh: number
  bhyt: number
  bhtn: number
  personalDeduction: number
  dependentDeduction: number
  insuranceCapBhxhBhyt: number
  insuranceCapBhtn: number
  region: string
  regionMinWage: number
  taxBrackets: Array<{ limit: number; rate: number }>
}

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: Config
  onConfigChange: (config: Config) => void
  onReset: () => void
}

export function SettingsDialog({ open, onOpenChange, config, onConfigChange, onReset }: SettingsDialogProps) {
  const [localConfig, setLocalConfig] = useState<Config>(config)

  useEffect(() => {
    setLocalConfig(config)
  }, [config])

  const handleSave = () => {
    onConfigChange(localConfig)
    onOpenChange(false)
  }

  const updateInsurance = (key: "bhxh" | "bhyt" | "bhtn", value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setLocalConfig({ ...localConfig, [key]: Math.max(0, Math.min(100, numValue)) })
  }

  const updateDeduction = (key: "personalDeduction" | "dependentDeduction" | "insuranceCapBhxhBhyt" | "insuranceCapBhtn" | "regionMinWage", value: string) => {
    const numValue = Number.parseFloat(value.replace(/[^0-9]/g, "")) || 0
    setLocalConfig({ ...localConfig, [key]: numValue })
  }

  const updateTaxBracket = (index: number, field: "limit" | "rate", value: string) => {
    const numValue = Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0
    const newBrackets = [...localConfig.taxBrackets]
    newBrackets[index] = { ...newBrackets[index], [field]: numValue }
    setLocalConfig({ ...localConfig, taxBrackets: newBrackets })
  }

  const formatCurrency = (value: number): string => {
    if (value === Number.POSITIVE_INFINITY) return "∞"
    return new Intl.NumberFormat("vi-VN").format(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Cài đặt tham số</DialogTitle>
          <DialogDescription>Tùy chỉnh các tỷ lệ bảo hiểm, khấu trừ và bậc thuế theo nhu cầu của bạn</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Accordion type="single" collapsible defaultValue="insurance" className="w-full">
            {/* Insurance Rates */}
            <AccordionItem value="insurance">
              <AccordionTrigger className="text-lg font-semibold">Tỷ lệ bảo hiểm</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bhxh">BHXH (%)</Label>
                      <Input
                        id="bhxh"
                        type="number"
                        step="0.1"
                        value={localConfig.bhxh}
                        onChange={(e) => updateInsurance("bhxh", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bhyt">BHYT (%)</Label>
                      <Input
                        id="bhyt"
                        type="number"
                        step="0.1"
                        value={localConfig.bhyt}
                        onChange={(e) => updateInsurance("bhyt", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bhtn">BHTN (%)</Label>
                    <Input
                      id="bhtn"
                      type="number"
                      step="0.1"
                      value={localConfig.bhtn}
                      onChange={(e) => updateInsurance("bhtn", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Vùng lương tối thiểu</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="region">Vùng</Label>
                        <select
                          id="region"
                          value={localConfig.region}
                          onChange={(e) => {
                            const region = e.target.value;
                            const regionWages = {
                              "I": 4960000,
                              "II": 4410000,
                              "III": 3860000,
                              "IV": 3450000
                            };
                            setLocalConfig({
                              ...localConfig,
                              region,
                              regionMinWage: regionWages[region as keyof typeof regionWages],
                              insuranceCapBhtn: regionWages[region as keyof typeof regionWages] * 20
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="I">Vùng I - Hà Nội, TP.HCM</option>
                          <option value="II">Vùng II - Thành phố trực thuộc TW</option>
                          <option value="III">Vùng III - Tỉnh lỵ, thị xã</option>
                          <option value="IV">Vùng IV - Các vùng còn lại</option>
                        </select>
                      </div>
                      <div>
                        <Label>Lương tối thiểu vùng hiện tại</Label>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                          {formatCurrency(localConfig.regionMinWage)} VND/tháng
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          💡 Ảnh hưởng đến trần BHTN: {formatCurrency(localConfig.insuranceCapBhtn)} VND
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Mức trần đóng bảo hiểm</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="cap-bhxh-bhyt">Trần BHXH + BHYT (VNĐ/tháng)</Label>
                        <Input
                          id="cap-bhxh-bhyt"
                          type="text"
                          value={formatCurrency(localConfig.insuranceCapBhxhBhyt)}
                          onChange={(e) => updateDeduction("insuranceCapBhxhBhyt", e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">20 lần lương cơ sở (46.8M)</p>
                      </div>
                      <div>
                        <Label htmlFor="cap-bhtn">Trần BHTN (VNĐ/tháng)</Label>
                        <Input
                          id="cap-bhtn"
                          type="text"
                          value={formatCurrency(localConfig.insuranceCapBhtn)}
                          onChange={(e) => updateDeduction("insuranceCapBhtn", e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          🔗 Tự động tính từ vùng lương tối thiểu (20 lần × {formatCurrency(localConfig.regionMinWage)})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Deductions */}
            <AccordionItem value="deductions">
              <AccordionTrigger className="text-lg font-semibold">Các khoản khấu trừ</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="personal">Giảm trừ bản thân (VNĐ/tháng)</Label>
                    <Input
                      id="personal"
                      type="text"
                      value={formatCurrency(localConfig.personalDeduction)}
                      onChange={(e) => updateDeduction("personalDeduction", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dependent">Giảm trừ người phụ thuộc (VNĐ/người/tháng)</Label>
                    <Input
                      id="dependent"
                      type="text"
                      value={formatCurrency(localConfig.dependentDeduction)}
                      onChange={(e) => updateDeduction("dependentDeduction", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tax Brackets */}
            <AccordionItem value="tax">
              <AccordionTrigger className="text-lg font-semibold">Bậc thuế TNCN</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {localConfig.taxBrackets.map((bracket, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                      <div>
                        <Label className="text-xs">Bậc {index + 1} - Giới hạn (VNĐ)</Label>
                        <Input
                          type="text"
                          value={bracket.limit === Number.POSITIVE_INFINITY ? "∞" : formatCurrency(bracket.limit)}
                          onChange={(e) => updateTaxBracket(index, "limit", e.target.value)}
                          disabled={bracket.limit === Number.POSITIVE_INFINITY}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Thuế suất (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={bracket.rate}
                          onChange={(e) => updateTaxBracket(index, "rate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              onReset()
              onOpenChange(false)
            }}
            className="flex-1"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Đặt lại mặc định
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Áp dụng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
