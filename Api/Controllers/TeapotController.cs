using Microsoft.AspNetCore.Mvc;

    public class TeapotController : BaseController
{
        
        [HttpGet("tell")]
        public string Tell()
        {
            return "I'm a teapot, epta.";
        }

    }
