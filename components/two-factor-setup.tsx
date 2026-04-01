/**
 * 2FA Setup Screen
 * Category: Authentication
 * Tags: auth, 2fa, security, totp, backup-codes
 * Description: Two-factor authentication setup with QR code, manual entry code, verification input, and downloadable backup codes.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/two-factor-setup.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TwoFactorSetup() {
  const backupCodes = ["a1b2-c3d4", "e5f6-g7h8", "i9j0-k1l2", "m3n4-o5p6", "q7r8-s9t0", "u1v2-w3x4", "y5z6-a7b8", "c9d0-e1f2"];

  return (
    <div className="min-h-[600px] bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Two-Factor Authentication</h2>
        <p className="text-sm text-gray-500 mb-6">Scan the QR code with your authenticator app.</p>
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 grid grid-cols-8 grid-rows-8 gap-0 border border-gray-200 p-2">
            {/* Fake QR pattern */}
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-xs text-gray-400 mb-1">Or enter this code manually:</p>
          <code className="text-sm font-mono font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded">ABCD-EFGH-IJKL-MNOP</code>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
          <input type="text" placeholder="000000" maxLength={6} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-center tracking-widest font-mono" />
        </div>
        <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm mb-6">Verify & Enable</button>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Backup Codes</h3>
          <p className="text-xs text-gray-500 mb-3">Save these codes in a secure place.</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {backupCodes.map(code => (
              <div key={code} className="text-xs font-mono bg-gray-50 text-gray-700 px-3 py-2 rounded text-center">{code}</div>
            ))}
          </div>
          <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Download</button>
        </div>
      </div>
    </div>
  );
}