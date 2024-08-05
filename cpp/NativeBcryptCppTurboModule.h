#include <React-Codegen/RNBcryptCppSpecJSI.h>


namespace facebook::react {
class NativeBcryptCppTurboModule: public NativeBcryptCppCxxSpec<NativeBcryptCppTurboModule> {
public:
    NativeBcryptCppTurboModule(std::shared_ptr<CallInvoker> jsInvoker);
    
    jsi::Value generateHash(jsi::Runtime &rt, std::string password, double workload);
    jsi::Value validatePassword(jsi::Runtime &rt, std::string password, std::string hash);
    std::string generateHashSync(jsi::Runtime &rt, std::string password, double workload);
    bool validatePasswordSync(jsi::Runtime &rt, std::string password, std::string hash);
};
}
