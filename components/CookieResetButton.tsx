'use client'

export default function CookieResetButton() {
  function reset() {
    localStorage.removeItem('achtech_cookie_consent')
    window.location.reload()
  }
  return (
    <button
      onClick={reset}
      className="text-orange hover:underline cursor-pointer"
      aria-label="Réinitialiser les préférences cookies"
    >
      Gérer les cookies
    </button>
  )
}
