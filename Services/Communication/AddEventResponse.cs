namespace Diplom.Services.Communication
{
    public class AddEventResponse : BaseResponse
    {
        private const string DefaultSuccessMessage = "Event added succesfully";

        public AddEventResponse(bool success, string message) : base(success, message) { }

        public AddEventResponse() : this(true, DefaultSuccessMessage) { }
    }
}
