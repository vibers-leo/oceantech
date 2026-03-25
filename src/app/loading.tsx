export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'var(--background, #fdfbf7)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid var(--border, #E5E5E5)',
        borderTopColor: 'var(--accent, #c5a065)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px',
      }} />
      <div style={{
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.3em',
        color: 'var(--secondary, #666)',
        textTransform: 'uppercase' as const,
      }}>
        Loading
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
