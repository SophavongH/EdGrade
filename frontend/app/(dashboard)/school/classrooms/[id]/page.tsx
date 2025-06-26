"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchClassroomById, fetchStudents, fetchClassroomStudents, addStudentsToClassroom } from "@/lib/api";
import { Button } from "@/components/ui/button";
import StudentTable from "@/components/dashboard/studentTable";
import AddStudentModal from "@/components/dashboard/addStudent"; // We'll create this below

import type { Student } from "@/app/(dashboard)/school/student/page";

const ClassroomName = ({ id }: { id: string }) => {
    const [classroom, setClassroom] = useState<{ id: string; name: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchClassroomById(id)
            .then((data) => {
                setClassroom(data);
                setLoading(false);
            })
            .catch(() => {
                setClassroom(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <span className="text-gray-400">Loading...</span>;
    if (!classroom) return <span className="text-red-500">Classroom Not Found</span>;
    return <span className="text-xl font-semibold">{classroom.name}</span>;
};

const Page = () => {
    const [tab, setTab] = useState(0);
    const params = useParams();

    // Modal state
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);

    // All students for selection (only user's students)
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    // Selected student IDs in modal
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    // Students in this classroom
    const [classroomStudents, setClassroomStudents] = useState<Student[]>([]);

    // Fetch all students for modal (only user's students)
    useEffect(() => {
        if (showAddStudentModal) {
            fetchStudents().then(setAllStudents);
        }
    }, [showAddStudentModal]);

    // Fetch classroom students for listing
    useEffect(() => {
        if (params.id) {
            fetchClassroomStudents(params.id as string).then(setClassroomStudents);
        }
    }, [params.id, showAddStudentModal]);

    // Add students to classroom
    const handleAddStudents = async () => {
        const result = await addStudentsToClassroom(params.id as string, selectedStudents);
        if (!result.alreadyAdded || result.alreadyAdded.length === 0) {
            setShowAddStudentModal(false);
            setSelectedStudents([]);
            fetchClassroomStudents(params.id as string).then(setClassroomStudents);
        }
        return result;
    };

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between mb-6">
                {typeof params.id === "string" && <ClassroomName id={params.id} />}
            </div>
            <div className="mt-4 pt-3">
                <div className="bg-[#fafbfc] rounded-2xl p-6">
                    <div className="flex items-center justify-between border-b border-gray-200 mb-6">
                        <div className="flex gap-8">
                            <button
                                className={`pb-2 font-semibold text-base focus:outline-none ${
                                    tab === 0
                                        ? "border-b-2 border-black text-black"
                                        : "text-gray-400 hover:text-black"
                                }`}
                                onClick={() => setTab(0)}
                            >
                                Report Card
                            </button>
                            <button
                                className={`pb-2 text-base focus:outline-none ${
                                    tab === 1
                                        ? "border-b-2 border-black text-black font-semibold"
                                        : "text-gray-400 hover:text-black"
                                }`}
                                onClick={() => setTab(1)}
                            >
                                Students
                            </button>
                        </div>
                        <div>
                            {tab === 1 && (
                                <Button
                                    className="bg-[#25388C] hover:bg-[#1e2e6d] text-white font-medium text-sm flex items-center gap-2 px-4 py-2 rounded-lg"
                                    onClick={() => setShowAddStudentModal(true)}
                                >
                                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                                        <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    បញ្ចូលសិស្សទៅក្នុងថ្នាក់
                                </Button>
                            )}
                        </div>
                    </div>
                    {/* Content box */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                        {tab === 0 && <>Item one</>}
                        {tab === 1 && (
                            <StudentTable
                                students={classroomStudents}
                                setStudents={setClassroomStudents}
                                classroomId={params.id as string}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* Add Student Modal */}
            <AddStudentModal
                open={showAddStudentModal}
                onClose={() => setShowAddStudentModal(false)}
                onAdd={handleAddStudents}
                students={allStudents}
                selected={selectedStudents}
                setSelected={setSelectedStudents}
            />
        </section>
    );
};

export default Page;
