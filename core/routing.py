from channels.auth import AuthMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.routing

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': URLRouter(
            chat.routing.websocket_urlpatterns
    ),
    # 'websocket': AuthMiddleware(
    #     URLRouter(
    #         chat.routing.websocket_urlpatterns
    #     )
    # ),
})