export default function Page() {
  return (
    <div>
      ENV TEST: {process.env.NEXT_PUBLIC_IMAGES_UPLOAD_SERVER || "undefined"}
    </div>
  );
}
