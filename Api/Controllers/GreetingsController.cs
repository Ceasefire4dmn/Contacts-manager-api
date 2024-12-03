using Microsoft.AspNetCore.Mvc;

    public class GreetingsController : BaseController
    {
        [HttpGet("getHi/{name}")]
        public string GreetingsGet(string name)
        {
            return $"Greetings, {name}!";
        }
    }
