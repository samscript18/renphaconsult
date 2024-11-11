"use client";

import { ButtonContained } from "@/components/ui/buttons";
import TextField from "@/components/ui/textField";
import { formatData } from "@/lib/utils/format.utils";
import { useCreateConsultation } from "@/services/consultation.service";
import { FormEvent, useState } from "react";

const ConsultationPage = () => {
  const [question, setQuestion] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const payload = useCreateConsultation();

  const getConsultation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await payload.mutateAsync({ question, destination });
  };

  return (
    <section className="pt-[10rem]">
      {payload.data ? (
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[1rem] md:text-[1.3rem] font-medium">
            Plan your next adventure with our AI-powered travel advice
          </h3>
          <p className="mt-6 text-[.9rem] font-semibold capitalize">
            {payload.data.question}
          </p>
          {/* <div className="mt-6 text-[.9rem]"></div> */}
          <p>{formatData(payload.data.response)}</p>
        </div>
      ) : (
        <form
          onSubmit={getConsultation}
          className="flex flex-col justify-center items-center md:w-[60vw] mx-auto"
        >
          <h3 className="text-[1rem] md:text-[1.3rem] font-medium">
            Plan your next adventure with our AI-powered travel advice
          </h3>
          <TextField
            InputProps={{
              placeholder: "Enter your consultation question",
              type: "text",
              required: true,
              value: question,
              onChange(e) {
                setQuestion(e.target.value);
              },
            }}
            multiline
            className="mt-6 border-none"
          />
          <TextField
            InputProps={{
              placeholder: "Which destination is this consultation about?",
              type: "text",
              required: true,
              value: destination,
              onChange(e) {
                setDestination(e.target.value);
              },
            }}
            className="mt-2 border-none"
          />
          <ButtonContained
            type="submit"
            className="mt-4 mx-auto w-[100px] no-underline md:w-[200px]"
            loading={payload.isPending}
            disabled={payload.isPending || !question || !destination}
          >
            Submit
          </ButtonContained>
        </form>
      )}
    </section>
  );
};
export default ConsultationPage;
