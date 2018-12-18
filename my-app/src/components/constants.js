var SERVERSIDE_URL = "http://localhost:3001"

module.exports = {
    ATTEMPT_REGISTER: SERVERSIDE_URL + "/register",
    ATTEMPT_LOGIN: SERVERSIDE_URL + "/login",
    SEARCH_FRIEND: SERVERSIDE_URL + "/search_friend",
    ADD_FRIEND: SERVERSIDE_URL + "/add_friend",
    GET_FRIENDS: SERVERSIDE_URL + "/get_friends",
    MAKE_GROUP: SERVERSIDE_URL + "/make_group",
    GET_GROUPS: SERVERSIDE_URL + "/get_groups",
    SEND_MESSAGE: SERVERSIDE_URL + "/send_message",
    GET_MESSAGES: SERVERSIDE_URL + "/get_messages",
}