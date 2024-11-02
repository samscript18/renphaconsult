'use client';
import { useRouter } from 'next/navigation';
import React, { ButtonHTMLAttributes, useCallback } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

const BackButton = ({ href, ...props }: Props) => {
  const router = useRouter();

  const route = useCallback(() => {
    href ? router.push(href) : router.back();
  }, []);

  return (
    <button {...props} className={`flex items-center gap-2 ${props.className}`} onClick={route}>
      <BsArrowLeft />
      Back
    </button>
  );
};

export default BackButton;
