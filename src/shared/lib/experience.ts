/** Число полных лет с указанной даты (формат "ДД.ММ.ГГГГ"). */
export function yearsSince(startDate: string, now: Date = new Date()): number {
	const [d, m, y] = startDate.split(".").map(Number);
	let years = now.getFullYear() - y;
	if (
		now.getMonth() + 1 < m ||
		(now.getMonth() + 1 === m && now.getDate() < d)
	) {
		years -= 1;
	}
	return Math.max(0, years);
}

/** Правильное склонение слова «год/года/лет» для числа. */
export function pluralYears(n: number): string {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return "год";
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
	return "лет";
}

/** Формат «N+ лет» для опыта, где N — нижняя граница опыта. */
export function plusYearsLabel(minYears: number): string {
	return `${minYears}+ ${pluralYears(minYears)}`;
}

/**
 * Метка стажа направления: берётся максимум из нижней границы опыта
 * и числа полных лет с указанной даты старта (если она задана).
 * Например, при старте 20.09.2025 и minYears=1 → «1+ год», «2+ года» и т.д.
 */
export function experienceLabel(
	minYears: number,
	startDate?: string,
	now: Date = new Date(),
): string {
	if (startDate) {
		const computed = yearsSince(startDate, now);
		const years = Math.max(minYears, computed);
		return `${years}+ ${pluralYears(years)}`;
	}
	return plusYearsLabel(minYears);
}

