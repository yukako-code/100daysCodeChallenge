function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="rounded-md border border-red-400 bg-red-50 p-3 text-sm text-red-700">
            {message}
        </div>
    );
}
export default ErrorBanner;