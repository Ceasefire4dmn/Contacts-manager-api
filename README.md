**Название проекта**: Контактный менеджер API.

**Цель проекта:** Разработать web API для управления списком контактов.

**Функциональные требования:**
1. **Создание контакта:**
    - Метод: POST 
    - Маршрут: /contacts
    - Описание: Создает новый контакт в списке.
    - Параметры: JSON объект с информацией о контакте (имя, номер телефона, адрес и т. д.)

2. **Получение списка контактов:**
    - Метод: GET
    - Маршрут: /contacts
    - Описание: Возвращает список всех контактов

3. **Получение информации о контакте по ID:**
    - Метод: GET
    - Маршрут: /contacts/{id}
    - Описание: Возвращает информацию о контакте с заданным ID

4.**Обновление информации о контакте:**

    -  Метод: PUT
    -  Маршрут: /contacts/{id}
    -  Описание: Обновляет информацию о контакте с заданным ID
    -  Параметры: JSON объект с обновленной информацией о контакте.

5. **Удаление контакта:**
    - Метод: DELETE
    - Маршрут: /contacts/{id}
    - Описание: Удаляет контакт с заданным ID из списка

**Тип ответов:** Все методы должны возвращать соответствующие HTTP статусы с возможным JSON телом ответа.

**Контроллер:**

- **Название:** ContactManagementController
- **Описание:** Контроллер для управления операциями CRUD над контактами.
- **Методы:** 
    - `CreateContact`: Создание нового контакта.
    - `GetAllContacts`: Получение списка всех контактов.
    - `GetContactById`: Получение информации о контакте по ID .
    - `UpdateContact`: Обновление информации о контакте.
    - `DeleteContact`: Удаление контакта.

**Примечания:** Все запросы и ответы должны использовать формат JSON для обмена данными.

*Примечание* Примерная модель контакта может быть такой:
```csharp
public class Contact
{
	public int Id {get; set;}
	public string Name {get; set;}
	public string PhoneNumber {get; set;}
	public string Email {get; set;}
    ///Доп. поля, например:
    //public string Address {get; set;}
}
```
---
#### Возможные улучшения:
1. Внедрение поиска по именам с усовершенствованным алгоритмом сортировки
2. Возможность удаления контактов после нахождения в поиске конкретного контакта
3. Динамический выбор из контактов по мере добавления букв в поиске
4. Работа с тегами, напоминаниями, календарь?