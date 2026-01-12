"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { addMeasurement } from "@/app/actions/measurements";

const initialState = {
    message: "",
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending} isLoading={pending}>
            Save Measurements
        </Button>
    );
}

interface AddMeasurementFormProps {
    onCancel?: () => void;
}

export function AddMeasurementForm({ onCancel }: AddMeasurementFormProps) {
    const [photoUrl, setPhotoUrl] = useState("");
    const [state, formAction] = useActionState(addMeasurement, initialState);

    return (
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-primary" />
            <CardHeader className="pt-8 px-8">
                <CardTitle className="text-2xl font-black uppercase tracking-tight italic">Update Metrics</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Scientific progress tracking. Input your measurements below.
                </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <form action={formAction} className="space-y-8">
                    <div className="relative group/upload">
                        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur opacity-0 group-hover/upload:opacity-100 transition duration-500" />
                        <div className="relative">
                            <ImageUpload
                                value={photoUrl}
                                onChange={setPhotoUrl}
                                label="Visual Proof (Progress Photo)"
                                description="Optional: Upload a photo to document your physical transformation"
                            />
                        </div>
                    </div>
                    <input type="hidden" name="photoUrl" value={photoUrl} />

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">
                                Body Metrics
                            </h3>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <InputField label="Weight" id="weight" name="weight" unit="kg" placeholder="85.5" required step="0.1" />
                            <InputField label="Chest" id="chest" name="chest" unit="cm" placeholder="104" step="0.1" />
                            <InputField label="Arms" id="arms" name="arms" unit="cm" placeholder="38.5" step="0.1" />
                            <InputField label="Waist" id="waist" name="waist" unit="cm" placeholder="79" step="0.1" />
                            <InputField label="Thighs" id="thighs" name="thighs" unit="cm" placeholder="61" step="0.1" />
                            <InputField label="Glutes" id="glutes" name="glutes" unit="cm" placeholder="98" step="0.1" />
                            <InputField label="Neck" id="neck" name="neck" unit="cm" placeholder="39.5" step="0.1" />
                        </div>
                    </div>

                    {state?.message && (
                        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 animate-in fade-in slide-in-from-top-2">
                            <p className="text-red-400 text-sm font-bold text-center italic">{state.message}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="flex-1 border-white/10 hover:bg-white/5 uppercase font-bold tracking-widest text-xs h-12"
                            >
                                Abort
                            </Button>
                        )}
                        <div className={onCancel ? "flex-1" : "w-full"}>
                            <SubmitButton />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function InputField({ label, id, name, unit, placeholder, required = false, step }: { label: string, id: string, name: string, unit: string, placeholder: string, required?: boolean, step?: string }) {
    return (
        <div className="space-y-2 group/field">
            <Label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-focus-within/field:text-primary transition-colors">
                {label} ({unit}) {required && "*"}
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    name={name}
                    type="number"
                    step={step}
                    placeholder={placeholder}
                    required={required}
                    className="bg-black/20 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all h-12 text-lg font-bold italic tracking-tight"
                />
            </div>
        </div>
    );
}

