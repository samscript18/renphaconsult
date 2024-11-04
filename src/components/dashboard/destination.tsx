import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import Image from "next/image";
import { ButtonOutlined } from "../ui/buttons";
import Link from "next/link";
import img from "../../../public/images/img-1.jpg";

const Destination = ({
  _id,
  name,
  description,
  // mainImage,
  budget,
}: IDestination) => {
  return (
    <article className="bg-[#fff] my-[2rem] rounded-md shadow-md">
      <Image src={img} alt={name} className="w-full h-full object-cover" />
      <footer className="py-[1.5rem] px-[2rem]">
        <div className="flex justify-between items-center mb-[1.5rem]">
          <h4 className="mb-0 text-[1rem]">{name}</h4>
          <h4 className="mb-0 text-[#fff] text-[.85rem] bg-[#00628f] py-[0.5rem] px-[0.75rem] rounded-sm">
            ₦{budget}
          </h4>
        </div>
        <p className="text-[.85rem]">{description}</p>
        <Link href={`/dashboard/destination/${_id}`}>
          <ButtonOutlined className="mt-4 mx-auto w-[100px] no-underline md:w-[200px]">
            View more
          </ButtonOutlined>
        </Link>
      </footer>
    </article>
  );
};
export default Destination;
