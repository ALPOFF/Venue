//HomeScreen
import LocalizedStrings from 'react-native-localization';

export const localizeHomeScreen = new LocalizedStrings({
    "en-US": {
        eventStatus: "No events found nearby"
    },
    ru: {
        eventStatus: "Поблизости не найдено ни одного события"
    }
});

export const localizeDetailScreen = new LocalizedStrings({
    "en-US": {
        eventNameText: "Event Name...",
        eventDescrText: "Type here the description of your event...",
        eventCategText: "Choose category...",
        PickPlaceText: "Pick place on map"
    },
    ru: {
        eventNameText: "Название события...",
        eventDescrText: "Краткое описание события...",
        eventCategText: "Выберите категорию...",
        PickPlaceText: "Выберите место события"
    }
});

export const localizeSearchScreen = new LocalizedStrings({
    "en-US": {
        TypeHereText: "Type here to find user ..."
    },
    ru: {
        TypeHereText: "Начните вводить имя пользователя ..."
    }
});

export const localizeSideMenuScreen = new LocalizedStrings({
    "en-US": {
        SubscribersText: "Subscribers",
        SubscriptionsText: "Subscriptions",
        YourProfileText: "Your profile",
        SettingsText: "Settings",
        SignOutText: "Sign Out"
    },
    ru: {
        SubscribersText: "Подписчики",
        SubscriptionsText: "Подписки",
        YourProfileText: "Профиль",
        SettingsText: "Настройки",
        SignOutText: "Выйти"
    }
});

export const localizeMapScreen = new LocalizedStrings({
    "en-US": {
        YouAreHereText: "You are here"
    },
    ru: {
        YouAreHereText: "Вы здесь"
    }
});

export const localizeSignInScreen = new LocalizedStrings({
    "en-US": {
        dontHaveAccText: "Don't have an account?",
        forgotPassText: "Forgot your password?",
        resetText: "Reset password",
        signUpText: "Sign Up"
    },
    ru: {
        dontHaveAccText: "Нет аккаунта?",
        forgotPassText: "Забыли пароль?",
        resetText: "Сбросить пароль",
        signUpText: "Регистрация"
    }
});

export const localizeLoginReduxScreen = new LocalizedStrings({
    "en-US": {
        loginEmailText: "Login or Email",
        passText: "Password"
    },
    ru: {
        loginEmailText: "Логин или почта",
        passText: "Пароль"
    }
});

export const localizeSignUpScreen = new LocalizedStrings({
    "en-US": {
        emailText: "Email",
        loginText: "Login",
        passText: "Password",
        passReText: "Retype password"
    },
    ru: {
        emailText: "Введите почту",
        loginText: "Введите логин",
        passText: "Пароль",
        passReText: "Повторите пароль"
    }
});
