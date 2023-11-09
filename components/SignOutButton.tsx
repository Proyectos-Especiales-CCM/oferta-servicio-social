"use client"

interface SignOutButtonProps {
    className?: string
}

const SignOutButton = ({ className }: SignOutButtonProps) => {
    const handleSignOut = async () => {
        const response = await fetch('/auth/signout', {
            method: 'POST',
        })
        if (response.redirected) {
            window.location.href = response.url
        }
    }

    return <button className={className} onClick={handleSignOut}>Sign Out</button>
}

export default SignOutButton;
