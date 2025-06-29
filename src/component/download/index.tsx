export const DownLoadButton = () => {
  return (
    <div>
      <p className="font-semibold text-text-1">
        Download Full Annual Report (PDF)
      </p>
      <div className="flex gap-2">
        <button
          className="button"
          onClick={() => window.open("/report_english.html", "_blank")}
        >
          English Version
        </button>
        <button
          className="button"
          onClick={() => window.open("/report_thai.html", "_blank")}
        >
          Thai Version
        </button>
      </div>
    </div>
  );
};
