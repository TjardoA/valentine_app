import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import YesNoButtons from "../components/YesNoButtons.jsx";
import SuccessConfetti from "../components/SuccessConfetti.jsx";

const gifUrl = "https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif";

export default function ValentinePage() {
  const search = useLocation().search;
  const [invite, setInvite] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const senderName = params.get("from");
    const receiverName = params.get("to");
    const message = params.get("msg") || "";

    if (!senderName || !receiverName) {
      setInvite(null);
      return;
    }

    setInvite({
      senderName,
      receiverName,
      message,
    });
  }, [search]);

  const handleYes = async () => {
    if (audioRef.current) audioRef.current.play();
    setAccepted(true);
  };

  if (!invite) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-3xl font-bold text-rose-600">Link mist info</h1>
        <p className="text-rose-700 text-sm">
          Voeg ?from=Jij&to=Naam toe aan de link om je Valentine te laten zien.
        </p>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
        <SuccessConfetti />
        <h1 className="text-4xl font-extrabold text-rose-600">Yay! 💘</h1>
        <p className="text-lg text-rose-700">
          Thanks, {invite.receiverName}! Love delivered.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" preload="auto" />
      <img src={gifUrl} alt="cute gif" className="w-56 rounded-3xl shadow-float" />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-rose-600">
        Will you be my Valentine? 💖
      </h1>
      <YesNoButtons onYes={handleYes} />
      <p className="text-sm text-rose-600">
        From {invite.senderName}
        {invite.message ? ` — \"${invite.message}\"` : ""}
      </p>
    </div>
  );
}
