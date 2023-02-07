export const formatPhoneNumber = (value: string) => {
	if (!value) return value;

	const phoneNumber = value.replace(/[^\d]/g, "");
	const phoneNumberLength = phoneNumber.length;
	const phoneNumberSecondPart = `${phoneNumber.slice(
		0,
		3
	)}-${phoneNumber.slice(3)}`;
	const phoneNumberThirdPart = `${phoneNumber.slice(
		0,
		3
	)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

	if (phoneNumberLength < 4) return phoneNumber;

	if (phoneNumberLength < 7) {
		return phoneNumberSecondPart;
	}

	return phoneNumberThirdPart;
};
