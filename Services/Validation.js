// Services/SimpleValidation.js
class SimpleValidation {
    // Regex basiques pour l'inscription
    static patterns = {
        // Nom/Prénom : que des lettres, espaces, tirets (2-50 caractères)
        name: /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/,
        
        // Email classique
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        
        // Téléphone : 10 chiffres (avec ou sans 0 au début)
        phone: /^0?[1-9][0-9]{8}$/,
        
        // Code postal : 5 chiffres
        zipcode: /^[0-9]{5}$/,
        
        // Mot de passe : minimum 6 caractères
        password: /^.{6,}$/
    };

    // Messages d'erreur simples
    static messages = {
        name: "Le nom doit contenir uniquement des lettres (2 à 50 caractères)",
        email: "Veuillez saisir un email valide",
        phone: "Le téléphone doit contenir 10 chiffres",
        zipcode: "Le code postal doit contenir 5 chiffres",
        password: "Le mot de passe doit contenir au moins 6 caractères"
    };

    // Vérifier un champ
    static checkField(fieldName, value) {
        if (!value || value.trim() === '') {
            return { valid: false, message: "Ce champ est requis" };
        }

        const pattern = this.patterns[fieldName];
        if (!pattern) {
            return { valid: true, message: "" };
        }

        const isValid = pattern.test(value.trim());
        return {
            valid: isValid,
            message: isValid ? "" : this.messages[fieldName]
        };
    }

    // Vérifier tous les champs d'inscription
    static checkRegistration(userData) {
        const errors = {};
        
        // Vérifier chaque champ
        const fieldsToCheck = ['name', 'email', 'phone', 'zipcode', 'password'];
        
        fieldsToCheck.forEach(field => {
            if (userData[field]) {
                const result = this.checkField(field, userData[field]);
                if (!result.valid) {
                    errors[field] = result.message;
                }
            }
        });

        // Vérifier first_name avec les mêmes règles que name
        if (userData.first_name) {
            const result = this.checkField('name', userData.first_name);
            if (!result.valid) {
                errors.first_name = result.message;
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

export default SimpleValidation;