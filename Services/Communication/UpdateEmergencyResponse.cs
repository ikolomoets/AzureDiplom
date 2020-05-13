namespace Diplom.Services.Communication
{
    public class UpdateEmergencyResponse : BaseResponse
    {
        private const string DefaultSuccessMessage = "Emergency updated succesfully";

        public UpdateEmergencyResponse(bool success, string message) : base(success, message) { }

        public UpdateEmergencyResponse() : this(true, DefaultSuccessMessage) { }
    }
}
