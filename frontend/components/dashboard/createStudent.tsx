"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createStudent } from "@/lib/api";
import type { Student } from "@/app/(dashboard)/school/student/page";

type Props = {
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

const CreateStudent: React.FC<Props> = ({ setStudents }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    parentPhone: "",
    phone: "",
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.gender || !form.parentPhone) return;
    const newStudent = {
      ...form,
      avatar: image,
      gender: form.gender === "male" ? "Male" : "Female",
    };
    const created = await createStudent(newStudent);
    setStudents((prev) => [created, ...prev]);
    setForm({
      name: "",
      dob: "",
      gender: "",
      address: "",
      parentPhone: "",
      phone: "",
    });
    setImage(null);
  };

  return (
    <section className="flex flex-col mb-8">
      <div
        className="w-36 h-36 rounded-full bg-orange-200 flex items-center justify-center cursor-pointer mb-6 overflow-hidden"
        onClick={handleImageClick}
      >
        {image ? (
          <Image
            src={image}
            alt="Profile"
            width={144}
            height={144}
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="text-6xl text-white">+</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      {/* Form */}
      <form className="w-full max-w-2xl space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
            placeholder="Enter name"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              placeholder="Select date"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Sex</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block mb-1">Parent&#39;s Phone Number</label>
          <input
            name="parentPhone"
            value={form.parentPhone}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
            placeholder="Enter phone number"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#25388C] hover:bg-[#1e2e6d] text-white text-lg"
        >
          Create
        </Button>
      </form>
    </section>
  );
};

export default CreateStudent;
