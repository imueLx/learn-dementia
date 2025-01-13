"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProfileSection from "../../components/ProfileSection";

const ProfilePage = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/questions"); // Navigate to the questions page
  };

  return (
    <div>
      <ProfileSection onNext={handleNext} />
    </div>
  );
};

export default ProfilePage;
