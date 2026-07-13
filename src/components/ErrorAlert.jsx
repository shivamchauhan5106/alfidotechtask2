export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null

  return (
    <div className="alert alert-error" role="alert">
      <div>
        <strong>Error</strong>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button type="button" className="btn btn-secondary btn-sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
