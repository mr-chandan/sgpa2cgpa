"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function SGPAToCGPACalculator() {
  const [activeTab, setActiveTab] = useState("method1");
  const [sgpas, setSgpas] = useState<string[]>(["", ""]);
  const [totalSGPA, setTotalSGPA] = useState("");
  const [numSemesters, setNumSemesters] = useState("");
  const [gradingScale, setGradingScale] = useState("10.0");
  const [customScale, setCustomScale] = useState("");
  const [cgpa, setCGPA] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);

  const addSemester = () => {
    setSgpas([...sgpas, ""]);
  };

  const removeSemester = (index: number) => {
    const newSGPAs = sgpas.filter((_, i) => i !== index);
    setSgpas(newSGPAs);
  };

  const updateSGPA = (index: number, value: string) => {
    const newSGPAs = [...sgpas];
    newSGPAs[index] = value;
    setSgpas(newSGPAs);
  };

  const validateInputs = (): boolean => {
    if (activeTab === "method1") {
      const validSGPAs = sgpas.filter((sgpa) => sgpa !== "").map(Number);
      if (validSGPAs.length === 0) {
        toast.error("Please enter at least one SGPA");
        return false;
      }
      if (validSGPAs.some((sgpa) => isNaN(sgpa) || sgpa < 0 || sgpa > 10)) {
        toast.error("SGPA values must be between 0 and 10");
        return false;
      }
    } else {
      if (totalSGPA === "" || numSemesters === "") {
        toast.error("Please enter both Total SGPA and Number of Semesters");
        return false;
      }
      if (isNaN(Number(totalSGPA)) || isNaN(Number(numSemesters))) {
        toast.error("Total SGPA and Number of Semesters must be valid numbers");
        return false;
      }
      if (Number(totalSGPA) < 0 || Number(numSemesters) <= 0) {
        toast.error(
          "Total SGPA must be non-negative and Number of Semesters must be positive"
        );
        return false;
      }
    }

    if (gradingScale === "custom") {
      if (
        customScale === "" ||
        isNaN(Number(customScale)) ||
        Number(customScale) <= 0
      ) {
        toast.error(
          "Please enter a valid custom scale (must be a positive number)"
        );
        return false;
      }
    }

    return true;
  };

  const calculateCGPA = () => {
    if (!validateInputs()) return;

    let result: number;
    if (activeTab === "method1") {
      const validSGPAs = sgpas.filter((sgpa) => sgpa !== "").map(Number);
      result =
        validSGPAs.reduce((sum, sgpa) => sum + sgpa, 0) / validSGPAs.length;
    } else {
      result = Number(totalSGPA) / Number(numSemesters);
    }
    setCGPA(Number(result.toFixed(2)));
    setPercentage(calculatePercentage(result));
    toast.success("CGPA calculated successfully!");
  };

  const calculatePercentage = (cgpa: number): number => {
    switch (gradingScale) {
      case "4.0":
        return Number((cgpa * 25).toFixed(2));
      case "10.0":
        return Number((cgpa * 9.5).toFixed(2));
      case "custom":
        const scale = Number(customScale);
        return Number(((cgpa / scale) * 100).toFixed(2));
      default:
        return Number((cgpa * 10).toFixed(2));
    }
  };

  const reset = () => {
    setSgpas(["", ""]);
    setTotalSGPA("");
    setNumSemesters("");
    setGradingScale("10.0");
    setCustomScale("");
    setCGPA(null);
    setPercentage(null);
    toast.success("Calculator reset successfully!");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-center">
          SGPA to CGPA & Percentage Calculator
        </CardTitle>
        <CardDescription className="text-center">
          Easily calculate your CGPA and percentage using either method.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto">
            <TabsTrigger
              value="method1"
              className="text-sm sm:text-base py-2 px-4 h-auto flex items-center justify-center text-center"
            >
              Method 1: Individual SGPAs
            </TabsTrigger>
            <TabsTrigger
              value="method2"
              className="text-sm sm:text-base py-2 px-4 h-auto flex items-center justify-center text-center"
            >
              Method 2: Total SGPA & Semesters
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="method1" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Please enter your SGPA for each semester.
                  </p>
                  {sgpas.map((sgpa, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <Input
                        type="number"
                        placeholder={`SGPA for Semester ${index + 1}`}
                        value={sgpa}
                        onChange={(e) => updateSGPA(index, e.target.value)}
                        className="flex-grow"
                        min="0"
                        max="10"
                        step="0.01"
                      />
                      {index > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSemester(index)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                  <Button onClick={addSemester} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Semester
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="method2" className="mt-4">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Enter the total sum of all your SGPAs and the total number
                    of semesters.
                  </div>
                  <Input
                    type="number"
                    placeholder="Total SGPA"
                    value={totalSGPA}
                    onChange={(e) => setTotalSGPA(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                  <Input
                    type="number"
                    placeholder="Number of Semesters"
                    value={numSemesters}
                    onChange={(e) => setNumSemesters(e.target.value)}
                    min="1"
                    step="1"
                  />
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        <div className="mt-6 space-y-4">
          <Select value={gradingScale} onValueChange={setGradingScale}>
            <SelectTrigger>
              <SelectValue placeholder="Select Grading Scale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.0">4.0 scale</SelectItem>
              <SelectItem value="10.0">
                10.0 scale (most common in India)
              </SelectItem>
              <SelectItem value="custom">Custom scale</SelectItem>
            </SelectContent>
          </Select>
          {gradingScale === "custom" && (
            <Input
              type="number"
              placeholder="Enter custom scale (e.g., 5.0)"
              value={customScale}
              onChange={(e) => setCustomScale(e.target.value)}
              className="mt-2"
              min="0"
              step="0.1"
            />
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button onClick={calculateCGPA} className="flex-1">
              Calculate CGPA
            </Button>
            <Button onClick={reset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {cgpa !== null && percentage !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white shadow-lg"
            >
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-4 text-center"
              >
                Your Results
              </motion.h3>
              <div className="flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <p className="text-lg font-semibold">CGPA</p>
                  <p className="text-4xl font-bold">{cgpa}</p>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <p className="text-lg font-semibold">Percentage</p>
                  <p className="text-4xl font-bold">{percentage}%</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm text-muted-foreground">
        <div>
          CGPA is calculated by taking the average of all SGPAs. The percentage
          is then derived based on the selected grading scale.
        </div>
        <p className="mt-2">
          Disclaimer: Please confirm the calculation method with your
          institution for accuracy.
        </p>
      </CardFooter>
    </Card>
  );
}
