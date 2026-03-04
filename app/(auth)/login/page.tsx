"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Shield, Mail, KeyRound, ArrowLeft } from "lucide-react"

type Step = "email" | "otp"

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("s.zeze@bloomfield.com")
  const [otp, setOtp] = useState("")
  const [demoMessage, setDemoMessage] = useState("")

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("otp")
    setDemoMessage("")
  }

  const handleOtpComplete = (value: string) => {
    setOtp(value)
    if (value.length === 5) {
      router.push("/")
    }
  }

  const handleMethodClick = (method: string) => {
    setDemoMessage(
      `L'envoi par ${method} n'est pas disponible dans cette démo. Saisissez n'importe quel code à 5 chiffres.`
    )
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background">
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo + branding */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xl font-bold shadow-lg">
            B
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight">
              Bloomfield Terminal
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              L&apos;intelligence financière africaine
            </p>
          </div>
        </div>

        {/* Étape 1 — Email */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">
                Adresse email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@bloomfield.com"
                className="h-10 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" className="h-10 w-full text-sm">
              Continuer
            </Button>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Shield className="size-4 text-green-500" />
              <span className="text-xs text-muted-foreground">
                Authentification à double facteur{" "}
                <span className="font-medium text-green-500">activée</span>
              </span>
            </div>
          </form>
        )}

        {/* Étape 2 — Code OTP */}
        {step === "otp" && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                Code de vérification envoyé à
              </p>
              <p className="text-sm font-medium">{email}</p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={5}
                value={otp}
                onChange={handleOtpComplete}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12 text-lg" />
                  <InputOTPSlot index={1} className="size-12 text-lg" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} className="size-12 text-lg" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="size-12 text-lg" />
                  <InputOTPSlot index={4} className="size-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Saisissez le code à 5 chiffres
            </p>

            {/* Options d'envoi */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Vous n&apos;avez pas reçu le code ?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleMethodClick("email")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  <Mail className="size-3.5" />
                  Renvoyer par email
                </button>
                <button
                  type="button"
                  onClick={() => handleMethodClick("clé secrète")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  <KeyRound className="size-3.5" />
                  Clé secrète
                </button>
              </div>
            </div>

            {/* Message démo */}
            {demoMessage && (
              <p className="text-center text-xs text-amber-500">
                {demoMessage}
              </p>
            )}

            {/* Retour */}
            <button
              type="button"
              onClick={() => {
                setStep("email")
                setOtp("")
                setDemoMessage("")
              }}
              className="flex items-center justify-center gap-1.5 w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3" />
              Changer d&apos;adresse email
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-[11px] text-muted-foreground">
          © 2026 Bloomfield Intelligence · Abidjan, Côte d&apos;Ivoire
        </p>
      </div>
    </div>
  )
}
