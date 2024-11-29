"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(()=>import("./forms/TeacherForm"), {
    loading: () => <h1>Loading...</h1>
})
const StudentForm = dynamic(()=>import("./forms/StudentForm"), {
    loading: () => <h1>Loading...</h1>
})

const forms: { [key: string]: (type: "create" | "update", data?: any) => JSX.Element } = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />
};

const FormModal = ({
    table,
    type,
    data,
    id
}: {
    table:
        | "teacher"
        | "student"
        | "parent"
        | "subject"
        | "class"
        | "lesson"
        | "exam"
        | "assignment"
        | "result"
        | "attendance"
        | "event"
        | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id: number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor =
        type === "create"
            ? "bg-lamaYellow"
            : type === "update"
            ? "bg-lamaSky"
            : "bg-lamaPurple";

    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            closeButtonRef.current?.focus();
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    const Form = () => {
        if (type === "delete" && id) {
            return (
                <form action={`/delete/${table}/${id}`} className="p-4 flex flex-col gap-4">
                    <span className="text-center font-medium">
                        All data will be lost, are you sure you want to delete this {table}?
                    </span>
                    <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                        Delete
                    </button>
                </form>
            );
        }

        if (type === "create" || type === "update") {
            const formComponent = forms[table];
            return formComponent ? formComponent(type, data) : <span>Form not available for this table.</span>;
        }

        return <span>Form not found!</span>;
    };

    return (
        <>
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} width={16} height={16} alt="" />
            </button>
            {open && (
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[70%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                            ref={closeButtonRef}
                            tabIndex={0}
                        >
                            <Image src="/close.png" alt="Close" width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;
