import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.sendTags({
        'user_name': 'Lucas',
        'user_email': 'almeidalucas@exmaple.com'
    })
}

export function tagUserInfoDelete() {
    OneSignal.deleteTags(['user_name', 'user_email'])
}

export function tagCarUpdate(cardItemsCount: string) {
    OneSignal.sendTag('card_items_count', cardItemsCount)
}