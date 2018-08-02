from rest_framework.routers import DefaultRouter
from .views import TrainingViewSet

router_v1 = DefaultRouter()

router_v1.register('', TrainingViewSet)
urlpatterns = router_v1.urls
