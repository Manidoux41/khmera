export function validReportTarget(value: string) {
  return /^\/(?:en|fr|es|de)(?:\/[a-z0-9-]+)*\/?$/.test(value) && value.length <= 300;
}

export function validateReport(target: string, email: string, reason: number, details: string) {
  return validReportTarget(target) && Number.isInteger(reason) && reason >= 0 && reason < 6
    && (!email || (email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
    && details.trim().length >= 20 && details.length <= 2000;
}
