/**
 * Fichier d'utilitaires pour des fonctions communes utilisées dans l'application.
 */

/**
 * Formate une date en une chaîne de caractères lisible (ex: "25 juin 2024").
 * @param date La date à formater.
 * @returns La date formatée en chaîne de caractères.
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
};

/**
 * Tronque une chaîne de caractères si elle dépasse une certaine longueur.
 * Ajoute "..." à la fin de la chaîne tronquée.
 * @param str La chaîne de caractères à tronquer.
 * @param maxLength La longueur maximale autorisée pour la chaîne.
 * @returns La chaîne de caractères tronquée ou la chaîne originale si elle est plus courte que la longueur maximale.
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
};

/**
 * Gère une requête de l'API avec une stratégie de backoff exponentiel en cas d'échec.
 * Cela permet de retenter une requête qui a échoué avec des délais croissants.
 * @param fn La fonction asynchrone à exécuter.
 * @param retries Le nombre de tentatives restantes.
 * @param delay Le délai initial en millisecondes avant la prochaine tentative.
 */
export const retryWithExponentialBackoff = async <T>(
  fn: () => Promise<T>,
  retries: number = 5,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    await new Promise(res => setTimeout(res, delay));
    return retryWithExponentialBackoff(fn, retries - 1, delay * 2);
  }
};
