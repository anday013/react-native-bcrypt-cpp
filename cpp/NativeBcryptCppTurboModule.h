#if __has_include(<React-Codegen/RNBcryptCppSpecJSI.h>)
#include <React-Codegen/RNBcryptCppSpecJSI.h>
#elif __has_include("RNBcryptCppSpecJSI.h")
#include "RNBcryptCppSpecJSI.h"
#endif

#if __has_include("bcrypt/bcrypt.h")
#include "bcrypt/bcrypt.h"
#elif __has_include("bcrypt.h")
#include "bcrypt.h"
#endif
#include <jsi/jsi.h>
#include <ReactCommon/CallInvoker.h>

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
