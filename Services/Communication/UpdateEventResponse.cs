namespace Diplom.Services.Communication
{
    public class UpdateEventResponse : BaseResponse
    {
        private const string DefaultSuccessMessage = "Event updated succesfully";

        public UpdateEventResponse(bool success, string message) : base(success, message) { }

        public UpdateEventResponse() : this(true, DefaultSuccessMessage) { }
    }
}
