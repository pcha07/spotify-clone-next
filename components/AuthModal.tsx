"use client"

import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Modal from "./Modal"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();

    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh()
            onClose();
        }
    },[session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!isOpen) {
            onClose();
        }

    }
    return (
        <Modal title="welcome back" description="login to your account" isOpen={isOpen} onChange={onChange}>
            <Auth theme="dark" providers={["github"]} magicLink supabaseClient={supabaseClient} appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: "#404040",
                            brandAccent: "#22c55e"
                        }
                    }
                }
            }}/>
        </Modal>
    )
}

export default AuthModal
