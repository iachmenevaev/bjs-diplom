"use strict"
const logoutButton = new LogoutButton();
logoutButton.action = callback => ApiConnector.logout((callback) => {
    if (callback.success === true){
        location.reload()}});
 //Получение информации о пользователе
ApiConnector.current((callback) => {
    if (callback.success === true){
        ProfileWidget.showProfile(callback.data)}});
//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getStock(){
    ApiConnector.getStocks((callback)=>{
    if (callback.success === true){
        ratesBoard.clearTable();
        ratesBoard.fillTable(callback.data);
        }
       })

}
    setInterval(getStock,60000);
    //  Операции с деньгами
 const moneyManager = new MoneyManager;
 moneyManager.addMoneyCallback =  data => ApiConnector.addMoney (data,(callback) =>  { 
    if (callback.success === true){
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(callback.success,"операция пополнения счета успешна");
         }
    else if (callback.success === false){
       moneyManager.setMessage(callback.success,callback.error);
    }}); 
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data,(callback) =>  { 
    if (callback.success === true){
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(callback.success,"операция  пополнения счета успешна");
         }
    else if (callback.success === false){
       moneyManager.setMessage(callback.success,callback.error);
    }}); 
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data,(callback) =>  { 
    if (callback.success === true){
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(callback.success,"операция  пополнения счета успешна");
         }
    else if (callback.success === false){
       moneyManager.setMessage(callback.success,callback.error);
    }}); 
//  Работа с избранным
 const favoritesWidget = new FavoritesWidget;
 ApiConnector.getFavorites((callback) => {console.log (callback);
    if (callback.success === true){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);}});

 favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data,(callback) =>  { 
    if (callback.success === true){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
        favoritesWidget.setMessage(callback.success,"операция добавления выполнена успешно");
       }
    else if (callback.success === false){
        favoritesWidget.setMessage(callback.success,callback.error);
    }}); 
    favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data,(callback) => {
        if (callback.success === true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(callback.success,"операция удаления выполнена успешно");
           }
        else if (callback.success === false){
            favoritesWidget.setMessage(callback.success,callback.error);
        }}); 
    