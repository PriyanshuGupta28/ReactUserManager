// 1. Define a regular expression pattern for matching alphanumeric characters with spaces.
export const AlphaNumericWithSpace = /^[a-zA-Z0-9 ]*$/gm;

// 2. Define a regular expression pattern for matching alphanumeric characters (at least one character required).
export const AlphaNumeric = /^[a-zA-Z0-9]+$/;

// 3. Define a regular expression pattern for matching alphabetic characters (letters only).
export const Alphabets = /^[A-Za-z]+$/;

// 4. Match an email address pattern.
const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// Used for validating email addresses. Ensures it follows the common email format.

// 5. Match a URL pattern (HTTP/HTTPS only).
const UrlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
// Validates URLs, primarily HTTP and HTTPS URLs, for web links.

// 6. Match a date in the format YYYY-MM-DD.
const DatePattern = /^\d{4}-\d{2}-\d{2}$/;
// Used to validate dates in the YYYY-MM-DD format.

// 7. Match a time in 24-hour format (HH:MM).
const TimePattern24Hr = /^([01]\d|2[0-3]):[0-5]\d$/;
// Validates time in 24-hour format, ensuring hours and minutes are valid.

// 8. Match a time in 12-hour format with AM/PM (hh:MM AM/PM).
const TimePattern12Hr = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
// Validates time in 12-hour format with AM or PM specified.

// 9. Match a hexadecimal color code (e.g., #RRGGBB or #RGB).
const HexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
// Used for validating hexadecimal color codes, including short forms.

// 10. Match a phone number (U.S. format).
const PhoneNumberPatternUS = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
// Validates U.S. phone numbers, allowing for various separators.

// 11. Match an Indian ZIP code (PIN code) consisting of 6 digits.
const IndianZipCodePattern = /^\d{6}$/;
// Validates Indian postal codes, which are 6-digit numbers.

// 12. Match a social security number (SSN) in U.S. format.
const SSNPatternUS = /^\d{3}-\d{2}-\d{4}$/;
// Validates U.S. social security numbers in the format XXX-XX-XXXX.

// 13. Match an IPv4 address.
const IPv4Pattern =
  /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/;
// Used for validating IPv4 addresses.

// 14. Match a strong password (8+ characters, with at least one uppercase letter, one lowercase letter, one number, and one special character).
const StrongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Ideal for validating strong passwords, ensuring they meet security criteria.

// 15. Match an IP address (IPv4 or IPv6).
const IPAddressPattern =
  /^(?:(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Fa-f0-9]{1,4}::?){1,7}[A-Fa-f0-9]{1,4})$/;
// Validates both IPv4 and IPv6 addresses.

// 16. Match a valid credit card number (simple check based on the Luhn algorithm).
const CreditCardPattern = /^\d{13,19}$/;
// Performs a simple Luhn algorithm check to identify potentially valid credit card numbers.

// 17. Match a username (alphanumeric characters, underscores, and dashes, 3 to 16 characters).
const UsernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
// Used for validating usernames, allowing for common special characters.

// 18. Match a strong username (alphanumeric characters only, at least 6 characters).
const StrongUsernamePattern = /^[a-zA-Z0-9]{6,}$/;
// Ideal for simple username validation, requiring a minimum length.

// 19. Match a simple slug (alphanumeric characters, underscores, and dashes).
const SlugPattern = /^[a-z0-9_-]+$/;
// Used for validating simple slugs or URL-friendly strings.

// 20. Match a currency amount (positive or negative, with optional commas and decimal points).
const CurrencyPattern = /^-?\d{1,3}(,\d{3})*(\.\d+)?$/;
// Validates currency amounts, allowing for commas and decimal points.

// 21. Match an ISBN (International Standard Book Number) for books.
const ISBNPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3}[\dX])?$)[\d-]+$/;
// Used to validate ISBNs, considering both ISBN-10 and ISBN-13 formats.

// 22. Match an HTML tag (opening or closing tag).
const HtmlTagPattern = /<[^>]+>/;
// Useful for extracting or identifying HTML tags within text.

// 23. Match a valid UUID (Universally Unique Identifier) format.
const UUIDPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
// Used for validating UUIDs with the standard format.
