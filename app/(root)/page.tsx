import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";

import {
    getCurrentUser,
    getInterviewsByUserId,
    getLatestInterviews,
} from "@/lib/actions/auth.action";

const Page = async () => {
    // Get current logged in user
    const user = await getCurrentUser();

    // Prevent undefined user errors
    if (!user) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p>User not logged in</p>
            </div>
        );
    }

    // Fetch interviews in parallel
    const [userInterviews, latestInterviews] = await Promise.all([
        getInterviewsByUserId(user.id),
        getLatestInterviews({ userId: user.id }),
    ]);

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews?.length > 0;

    return (
        <>
            {/* CTA Section */}
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

                    <p className="text-lg">
                        Practice real interview questions and get instant feedback
                    </p>

                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    alt="robo-dude"
                    width={400}
                    height={400}
                    className="max-sm:hidden"
                />
            </section>

            {/* Past Interviews */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>

                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p>You haven't taken any interviews yet</p>
                    )}
                </div>
            </section>

            {/* New Interviews */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>

                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        latestInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p>There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Page;