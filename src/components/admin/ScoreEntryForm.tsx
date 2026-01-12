"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { enterScore } from "@/app/actions/admin";

interface ScoreEntryFormProps {
    competitionId: string;
    members: Array<{
        id: string;
        name: string;
        email: string;
        gender: string | null;
    }>;
}

export function ScoreEntryForm({ competitionId, members }: ScoreEntryFormProps) {
    const [selectedMember, setSelectedMember] = useState("");
    const [category, setCategory] = useState("");
    const [score, setScore] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedMember || !category || !score) {
            setMessage("Please fill all fields");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const result = await enterScore(
                competitionId,
                selectedMember,
                category,
                parseFloat(score)
            );

            if (result.success) {
                setMessage("Score entered successfully!");
                setCategory("");
                setScore("");
                // Refresh the page to show updated scores
                window.location.reload();
            } else {
                setMessage(result.message || "Failed to enter score");
            }
        } catch (error) {
            setMessage("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="member">Select Member</Label>
                    <select
                        id="member"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    >
                        <option value="">Choose a member...</option>
                        {members.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name} {member.gender ? `(${member.gender})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g., Squats, Bench Press"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="score">Score</Label>
                    <Input
                        id="score"
                        type="number"
                        step="0.01"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="0.00"
                        required
                    />
                </div>
            </div>

            {message && (
                <p className={`text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}

            <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Enter Score"}
            </Button>
        </form>
    );
}
