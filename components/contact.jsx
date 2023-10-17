"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SubmitBtn from "./submit-btn";
import Swal from "sweetalert2";
import { sendEmail } from "@/actions/sendEmail";
import "animate.css";
import "./contact.css";

const Contact = () => {
    const { ref } = useSectionInView("Contact", 0.3);
    return (
        <motion.section
            id="contact"
            ref={ref}
            className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center scroll-mt-32"
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1,
            }}
            viewport={{
                once: true,
            }}
        >
            <SectionHeading>Contact Me</SectionHeading>
            <p className="text-slate-700">
                Please contact me directly at{" "}
                <a className="underline" href="mailto:elifbensuaslan@gmail.com">
                    elifbensuaslan@gmail.com
                </a>{" "}
                or through this form.
            </p>
            <form
                action={async (formData) => {
                    const { data, error } = await sendEmail(formData);

                    if (error) {
                        Swal.fire({
                            title: "Something went wrong!",
                            text: error(error),
                            icon: "error",
                            allowOutsideClick: "true",
                            allowEnterKey: "true",
                            buttonsStyling: false,
                            customClass: {
                                popup: "sweetalert-custom-popup",
                                confirmButton: "sweetalert-custom-button",
                            },
                            width: "28rem",
                            height: "24rem",
                            showClass: {
                                popup: "animate__animated animate__fadeInDown",
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutUp",
                            },
                        });
                        return;
                    }

                    Swal.fire({
                        title: "Your e-mail hass been sent successfully",
                        icon: "success",
                        allowOutsideClick: "true",
                        allowEnterKey: "true",
                        buttonsStyling: false,
                        customClass: {
                            popup: "sweetalert-custom-popup",
                            confirmButton: "sweetalert-custom-button",
                        },
                        width: "28rem",
                        height: "24rem",
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    });
                }}
                className="mt-10 flex flex-col items-center justify-center gap-8 w-full"
            >
                <input
                    type="email"
                    name="senderEmail"
                    required
                    maxLength={500}
                    placeholder="Your email"
                    className="h-14 rounded-lg border border-black/10 p-4 w-full"
                />
                <textarea
                    name="message"
                    placeholder="Your message"
                    required
                    maxLength={5000}
                    id=""
                    className="h-52 rounded-lg border border-black/10 p-4 w-full active:border-purple-600"
                ></textarea>
                <SubmitBtn />
            </form>
        </motion.section>
    );
};

export default Contact;
