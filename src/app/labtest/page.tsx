
"use client";

import React, { useState, useMemo } from "react";
import { LabTestCard } from "../../components/LabTestCard";

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

// Mock data — swap this out for your real API fetch!
interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  duration: string;
  category: string;
}

const TESTS: LabTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    description: "Evaluates overall health and detects conditions like anemia, infection, and leukemia.",
    price: 450,
    duration: "15 min",
    category: "Blood Test",
  },
  {
    id: "lipid",
    name: "Lipid Profile",
    description: "Measures cholesterol and triglyceride levels to assess heart disease risk.",
    price: 600,
    duration: "15 min",
    category: "Blood Test",
  },
  {
    id: "bmp",
    name: "Basic Metabolic Panel (BMP)",
    description: "Checks glucose, calcium, electrolytes, and kidney function.",
    price: 550,
    duration: "20 min",
    category: "Blood Test",
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    description: "Assesses liver enzymes, proteins, and bilirubin levels.",
    price: 500,
    duration: "20 min",
    category: "Blood Test",
  },
  {
    id: "tsh",
    name: "TSH - Thyroid Stimulating Hormone",
    description: "Evaluates thyroid gland function and hormone levels.",
    price: 400,
    duration: "15 min",
    category: "Hormone Test",
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycated Hemoglobin)",
    description: "Monitors average blood sugar over 2-3 months.",
    price: 480,
    duration: "15 min",
    category: "Diabetes Test",
  },
  {
    id: "vitd",
    name: "Vitamin D (25-OH)",
    description: "Checks Vitamin D levels important for bone and immune health.",
    price: 650,
    duration: "15 min",
    category: "Vitamin Test",
  },
  {
    id: "urinalysis",
    name: "Urine Routine Examination",
    description: "Detects urinary tract infections and metabolic disorders.",
    price: 300,
    duration: "10 min",
    category: "Urine Test",
  },
  {
    id: "crp",
    name: "C-Reactive Protein (CRP)",
    description: "Measures inflammation and assesses cardiovascular risk.",
    price: 380,
    duration: "15 min",
    category: "Inflammation Test",
  },
  {
    id: "psa",
    name: "PSA - Prostate-Specific Antigen",
    description: "Used to screen for prostate conditions in men.",
    price: 750,
    duration: "15 min",
    category: "Cancer Marker",
  },
];


export default function LabTestsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(TESTS.map((t) => t.category)))],
    []
  );

  const filtered = useMemo(
    () =>
      TESTS.filter((t) => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
        const matchesCat = category === "All" || t.category === category;
        return matchesSearch && matchesCat;
      }),
    [search, category]
  );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800">Available Lab Tests</h1>
      <p className="mt-1 text-gray-600">
        Browse our comprehensive range of diagnostic tests. Select a test to view details and book an appointment.
      </p>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tests…"
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-48 border rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Cards Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((test) => (
          <LabTestCard key={test.id} test={test} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No tests found.</p>
      )}
    </main>
  );
}
